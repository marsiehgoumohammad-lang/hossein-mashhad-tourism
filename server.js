import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(
  process.env.APP_PORT || process.env.DEFAULT_APP_PORT || 3000
);

const app = express();
app.disable("x-powered-by");

// Load clean-URL and alias redirects from vercel.json if present
let redirects = [];
try {
  const vercelConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, "vercel.json"), "utf8")
  );
  if (Array.isArray(vercelConfig.redirects)) {
    redirects = vercelConfig.redirects;
  }
} catch {
  redirects = [];
}

const COMPRESSIBLE_RE =
  /^(?:text\/|application\/(?:javascript|json|xml|manifest\+json)|image\/svg\+xml)/i;

// Zero-dependency gzip compression for HTML/CSS/JS/XML/TXT GET responses
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Vary", "Accept-Encoding");

  const acceptEncoding = String(req.headers["accept-encoding"] || "");
  if (
    req.method !== "GET" ||
    !/\bgzip\b/i.test(acceptEncoding) ||
    req.headers.range
  ) {
    return next();
  }

  const origWrite = res.write.bind(res);
  const origEnd = res.end.bind(res);
  const chunks = [];
  let decided = false;
  let shouldCompress = false;

  function decide() {
    if (decided) return;
    decided = true;
    const contentType = String(res.getHeader("Content-Type") || "");
    const contentEncoding = res.getHeader("Content-Encoding");
    shouldCompress =
      res.statusCode === 200 &&
      !contentEncoding &&
      COMPRESSIBLE_RE.test(contentType);
    if (shouldCompress) {
      res.removeHeader("Content-Length");
      res.setHeader("Content-Encoding", "gzip");
    }
  }

  res.write = (chunk, encoding, cb) => {
    const enc = typeof encoding === "string" ? encoding : undefined;
    const callback = typeof encoding === "function" ? encoding : cb;
    decide();
    if (!shouldCompress) {
      return origWrite(chunk, enc, callback);
    }
    if (chunk) {
      chunks.push(
        Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, enc || "utf8")
      );
    }
    if (typeof callback === "function") callback();
    return true;
  };

  res.end = (chunk, encoding, cb) => {
    const enc = typeof encoding === "string" ? encoding : undefined;
    const callback = typeof encoding === "function" ? encoding : cb;
    decide();
    if (!shouldCompress) {
      return origEnd(chunk, enc, callback);
    }
    if (chunk) {
      chunks.push(
        Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, enc || "utf8")
      );
    }
    const raw = Buffer.concat(chunks);
    zlib.gzip(raw, (err, compressed) => {
      if (err) {
        res.removeHeader("Content-Encoding");
        return origEnd(raw, undefined, callback);
      }
      res.setHeader("Content-Length", String(compressed.length));
      return origEnd(compressed, undefined, callback);
    });
    return res;
  };

  next();
});

// Apply redirects defined in vercel.json
for (const rule of redirects) {
  if (!rule.source || !rule.destination) continue;
  app.get(rule.source, (req, res) => {
    const queryIndex = req.originalUrl.indexOf("?");
    const suffix = queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : "";
    res.redirect(rule.permanent ? 308 : 307, `${rule.destination}${suffix}`);
  });
}

// Serve static assets and HTML pages with clean URLs (e.g. /about-hussein -> about-hussein.html)
app.use(
  express.static(__dirname, {
    extensions: ["html"],
    index: ["index.html"],
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (
        filePath.endsWith(`${path.sep}styles.css`) ||
        filePath.endsWith(`${path.sep}script.js`)
      ) {
        res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
      } else if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
      }
    },
  })
);

app.use((req, res) => {
  res.status(404).type("text/plain; charset=utf-8").send("Not Found");
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Hossein Mashhad Tourism static server running on http://0.0.0.0:${PORT}`
  );
});

server.on("error", (err) => {
  console.error(`Failed to start server on port ${PORT}:`, err.message);
  process.exit(1);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
