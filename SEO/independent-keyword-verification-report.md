# تقرير التحقق المستقل من تغطية الكلمات المفتاحية العربية (Independent Keyword Verification Report)

- **الموقع الرسمي (Canonical):** `https://hossein-mashhad-tourism.vercel.app/`
- **الفرع المرجعي للتدقيق:** `review/independent-arabic-keyword-audit` (مبني على `review/arabic-keyword-complete-implementation` — `aa3c358c6512f058443e94139703ad41f4417fa5`)
- **الأصل `main`:** `05e8fca2ba528390625fe19295c536af1036de3c` (محفوظ دون تعديل — 75 صفحة HTML)
- **تاريخ التقرير:** 2026-11-18
- **المنهجية:** فحص برمجي ويدوي لحدود الكلمات (Word-boundary Arabic normalization + exact match) لجميع الـ **165 مدخلاً** في `SEO/arabic-keyword-master-map.md` مقابل جميع الـ **79 صفحة HTML** المدرجة في `sitemap.xml`.

---

## 1. ملخص المطابقة والتصحيحات المنهجية (Reconciliation)

| البند | القيمة الحقيقية الموثقة | تصحيح الالتباس السابق |
|---|---|---|
| إجمالي مدخلات قاعدة الكلمات المفتاحية | **165 مدخلاً** | تصحيح الرقم **148** الذي ورد في تقرير سابق؛ صفوف الجدول الفعلية في `SEO/arabic-keyword-master-map.md` هي 165 مدخلاً (من #1 إلى #165). |
| إجمالي روابط `sitemap.xml` وصفحات HTML | **79 رابطاً / 79 صفحة HTML** | 75 صفحة على `main` (`05e8fca`) + 4 صفحات مضافة في `review/arabic-seo-keyword-expansion` (`5dc168d`: الأزواج/شهر العسل، السفر الفردي/الشبابي، صحون الحرم، الدليل القانوني للزواج المؤقت). كان ملف التدقيق القديم في `5dc168d` يحتوي 75 صفاً فقط لإغفال الصفحة الرئيسية `/`؛ أُدرجت `/` الآن مع كامل الحقول الـ 14 المطلوبة. |
| الكلمات المفحوصة فردياً | **165 / 165 (100%)** | فحص آلي وبشري لكل كلمة في العنوان والوصف و`H1` و`H2/H3` و`FAQ` والروابط الداخلية والمتن. |
| وضع التحقق الإنتاجي (Production & GSC) | **غير متحقق من بيئة العمل** | جميع الفحوصات تمت على مستودع GitHub وبيئة العمل المحلية لفرع المراجعة؛ **لا يُعد هذا التقرير تحققاً من النشر المباشر على Vercel أو الفهرسة في Google Search Console**. |

---

## 2. مقارنة قبل التصحيح (`aa3c358`) وبعد التدقيق المستقل

| فئة التغطية (بمعيار حدود الكلمات الصارم) | قبل التصحيح (`aa3c358`) | بعد التدقيق والإصلاح | الملاحظة والتفسير الدقيق |
|---|---|---|---|
| **تغطية مباشرة كاملة على الصفحة المستهدفة** (`Title` / `Meta` / `H1` / `H2/H3` / `FAQ` / `Anchor` / `Body(exact)`) | 151 | **150** | تمت إضافة 5 كلمات عربية نظيفة كانت غائبة فعلياً عن صفحاتها المستهدفة (`#22`, `#34`, `#35`, `#46`, `#47`)، بينما أُزيلت الصيغ الكيبوردية الفارسية/غير المفصولة من المتن العام. |
| **تغطية عبر تطابق عربي مُطبّع (Normalized Arabic Variant)** | 8 | **9** | تشمل `#19, #20, #21, #22, #77, #95, #97, #98, #138` (اختلاف الهمزة أو التاء المربوطة أو حرف العطف؛ وقد صُححت `#98` في `rhinoplasty-mashhad.html` لإزالة الشرطة الطويلة). |
| **صيغ كيبورد فارسي / بدون مسافة / اختصار / نكرة فارسية مغطاة بالبديل العربي الفصيح** | — (كانت مقحمة جزئياً أو مصنفة خطأً كـ `Body(exact)`) | **6** | `#6 امام رضا`، `#25 زيارة الامام الرضا ع`، `#33 زیارت امام رضا`، `#58 فندق قصرالدولي`، `#60 هتل آپارتمان نوين مشهد`، `#61 هتل های مشهد`: محفوظة في الخريطة ومغطاة دلالياً في صفحاتها بصيغتها العربية السليمة دون تشويه تجربة القارئ العربي. |
| **كلمات عربية نظيفة مفقودة من صفحاتها المستهدفة** | **5** (`#22, #34, #35, #46, #47`) | **0** | **صفر** فجوات متبقية لكلمات عربية سليمة. |
| **صفحات ذات مشاكل هيكلية أو تداخل لغوي بحاجة لتحسين** | 12+ صفحة (ادعاءات فندقية غير مقيدة، خطأ قانوني، كلمات مفقودة، عبارات فارسية مقحمة، أو قوالب تدقيق عامة) | **3 أزواج دمج/تحديد حدود للمرحلة القادمة** | تم إصلاح 11 صفحة HTML خلال هذا التدقيق وتصحيح جميع صفوف `SEO/*.md`. |

### الكلمات المفقودة فعلياً في `aa3c358` التي أُصلحت في HTML:
1. `#22 زيارة الامام علي بن موسى الرضا` (P1) -> أُدمجت طبيعياً في `.page-lead` بصفحة `/guide-ziyarah-imam-reza`.
2. `#34 زيارة مرقد الإمام الرضا` (P1) -> أُدمجت في `.quick-answer` بصفحة `/guide-ziyarah-imam-reza`.
3. `#35 زيارة مشهد من العراق` (**P0**) -> أُدمجت في `.quick-answer` بصفحة `/mashhad-from-iraq`.
4. `#46 الإقامة في مشهد` (**P0**) -> أُدمجت في `.quick-answer` بصفحة `/hotels-near-shrine-comparison`.
5. `#47 حجز فنادق مشهد` (**P0**) -> أُدمجت في `.quick-answer` بصفحة `/hotels-near-shrine-comparison`.
6. `#98 دكتور تجميل الانف في ايران مشهد` (P1) -> عُدلت الصياغة في `/rhinoplasty-mashhad` لإزالة الفاصل `—` وجعل العبارة طبيعية وسلسة.

---

## 3. تدقيق الادعاءات الواقعية والقانونية والتجارية (Factual & Legal Claims Audit)

1. **خطأ مادة القانون المدني الإيراني في `/temporary-marriage-iran-legal-guide` (تم التصحيح):** كانت الخلية الخاصة بالـ «النفقة والإرث» تشير خطأً إلى «المادتان ١٠٧٧ و١١١٣» (المادة ١٠٧٧ تخص المهر لا الإرث)؛ صُححت إلى **المادتين ٩٤٠ و١١١٣ من القانون المدني الإيراني**، مع تقييد إجراءات المادة ١٠٦٠ وبروتوكولات الفنادق بضرورة التحقق المباشر من القنصلية ومحامٍ مرخص وإدارة الفندق.
2. **التصنيف النجمي المنظم (`starRating`) في JSON-LD الفنادق (تمت الإزالة):** احتوت صفحات `almas-hotel-mashhad.html` (التي تغطي ألماس ١ المصنف ٤ نجوم وألماس ٢ المصنف ٥ نجوم)، و`darvishi-hotel-mashhad.html`، و`ghasr-talaei-hotel-mashhad.html`، و`madinat-al-reza-hotel-mashhad.html` على `"starRating":{"@type":"Rating","ratingValue":"5"}` دون مصدر تصنيف رسمي موثق في الصفحة؛ أُزيل من `JSON-LD` في الصفحات الأربع، وأُضيف رابط الموقع الرسمي ومصدر المسافات المنشورة (`madinahalreza.com` و`etours.ir`) إلى `madinat-al-reza-hotel-mashhad.html`.
3. **نطاقات الأسعار بالدولار وخصم «حتى ٢٠٪»:** قُيدت النصوص في صفحات الفنادق السبع (`hotels-near-shrine-comparison`، `qasr-hotel-mashhad`، `darvishi-hotel-mashhad`، `ghasr-talaei-hotel-mashhad`، `almas-hotel-mashhad`، `madinat-al-reza-hotel-mashhad`، `boshra-arman-apartments-mashhad`) للتأكيد الصريح على أنها **تقديرات استرشادية أولية غير ملزمة، وأن الخصومات التفاوضية المحتملة حتى ٢٠٪ خارج الذروة خاضعة لموافقة الفندق والإشغال دون أي ضمان ثابت**.
4. **معلومات المستشفيات ومراكز الإخصاب (تتطلب تحقّقاً دورياً):** صفحة `/ivf-centers-mashhad` وتفاصيل البروتوكولات والوثائق تستند إلى مراجع عامة وإرشادية ويجب مراجعة أسعار المراكز وشهادات `IPD` مباشرة عبر البوابة الرسمية للمستشفى ووزارة الصحة الإيرانية قبل الحجز.

---

## 4. مخاطر التداخل والدمج المقترح مستقبلاً (Cannibalization & Consolidation Candidates)

لم تُدمج صفحات حالياً للحفاظ على استقرار الروابط الـ 79 في `sitemap.xml`، لكن الفحص أظهر **٣ مناطق تداخل موضوعي محتمل** يوصى بضبطها أو دمجها في مراجعة لاحقة بناءً على بيانات Google Search Console الفعلية:
1. **`/mashhad-local-food-guide` مقابل `/mashhad-restaurants-shashlik-guide` و`/mashhad-markets-shopping-guide`:** يوصى في المرحلة القادمة إما بقصر `mashhad-local-food-guide` على إرشادات سلامة الطعام والنظام الغذائي للمرضى والزوار، أو دمجه عبر `301` إذا ثبت تقاسم الانطباعات نفسه في GSC.
2. **`/mashhad-shopping-malls-waterparks` مقابل `/mashhad-waterparks-guide` و`/mashhad-markets-shopping-guide`:** وجود صفحة مجمعة للأسواق والمدن المائية مع صفحتين متخصصتين لكل منهما قد يشتت الإشارات إذا لم يُحفظ دور الأولى كملخص مقارن واضح للأنشطة العائلية.
3. **`/guide-ziyarah-imam-reza` مقابل `/mashhad-pilgrimage-etiquette`:** تم الحفاظ على الفصل (الأول للتهيئة الروحية وتوقيت الزيارة، والثاني لللباس والأمانات وقواعد التصوير)، ويجب مراقبة تداخلهما في GSC.

---

## 5. جدول التحقق الفردي لجميع الـ 165 كلمة (Complete 165-Row Individual Verification)

| # | Keyword | Priority | Primary Target URL | Exact HTML Location(s) Verified | Verification Outcome | Real Excerpt / Evidence from Target HTML |
|---|---|---|---|---|---|---|
| 1 | ايران | P0 | `/mashhad-holy-city` | H2/H3, Anchor, Body(exact) | Verified — Direct Match | …ل للزائر العربي إلى مشهد ايران : محور السياحة الدينية في إيران وزيارة حرم ا… |
| 2 | إيران | P0 | `/mashhad-holy-city` | H2/H3, Anchor, Body(exact) | Verified — Direct Match | …محور السياحة الدينية في إيران وزيارة حرم الإمام الرضا، السياحة للعائلات في… |
| 3 | سفر | P1 | `/blog` | Body(exact) | Verified — Direct Match | …ة ودليل الزائر كل أدلة السفر والزيارة والفنادق والمستشفيات في مكان واحد.… |
| 4 | العراق | P0 | `/mashhad-from-iraq` | Title, Meta, H1, H2/H3, FAQ, Anchor, Body(exact) | Verified — Direct Match | …شهد / السفر إلى إيران من العراق وزيارة مشهد دليل السفر إلى إيران من العراق ·… |
| 5 | الحقن المجهري | P0 | `/infertility-treatment-mashhad` | Body(exact) | Verified — Direct Match | …قيق علاج العقم في إيران والحقن المجهري بمشهد: التحضير والتوقيت الإجابة المختصرة يبد… |
| 6 | امام رضا | P0 | `/guide-ziyarah-imam-reza` | Mapped to: الإمام الرضا (ومذكور «حرم امام رضا» في الجولة) | Canonical Arabic variant mapped | …لى مشهد / دليل زيارة حرم الإمام الرضا في مشهد للزائر العربي دليل السفر إلى مشهد ·… |
| 7 | سياحة | P1 | `/mashhad-holy-city` | Body(exact) | Verified — Direct Match | …إلى مشهد ايران : محور السياحة الدينية في إيران وزيارة حرم الإمام الرضا، ال… |
| 8 | مشهد | P0 | `/mashhad-holy-city` | Title, Meta, H1, H2/H3, FAQ, Anchor, Body(exact) | Verified — Direct Match | …لرئيسية / دليل السفر إلى مشهد / مشهد المقدسة دليل مشهد المقدسة · معلومات ل… |
| 9 | الامام الرضا | P0 | `/guide-ziyarah-imam-reza` | Title, Meta, H1, H2/H3, Anchor, Body(norm) | Verified — Direct Match | H1: دليل زيارة حرم الإمام الرضا في مشهد |
| 10 | زراعة الشعر | P1 | `/hair-transplant-mashhad` | Title, Meta, H1, H2/H3, FAQ, Body(exact) | Verified — Direct Match | …سية / السياحة العلاجية / زراعة الشعر في مشهد زراعة الشعر واللحية · تخطيط السفر وا… |
| 11 | طهران | P2 | `/infertility-treatment-mashhad` | Body(exact) | Verified — Direct Match | …ابيب والمقارنة بين مشهد وطهران عند التخطيط لـ علاج العقم بعد فشل أطفال الأن… |
| 12 | شمال ايران | P3 | `/mashhad-holy-city` | Body(exact) | Verified — Direct Match | …جوي أو الطبي الأولى) وعن شمال ايران (بغاباتها الساحلية المطلة على بحر قزوين)، إذ… |
| 13 | حرم امام رضا | P0 | `/imam-reza-shrine-tour-courtyards` | Body(exact) | Verified — Direct Match | …للافتات المحلية أحياناً «حرم امام رضا») بمعرفة العلاقة بين الصحون السماوية المفتوح… |
| 14 | زيارة مشهد | P0 | `/guide-ziyarah-imam-reza` | H2/H3, Anchor, Body(exact) | Verified — Direct Match | …من الزوار: كم يوم تكفي لزيارة مشهد؟ عملياً تتراوح معظم الرحلات المركّزة بين ٣ و… |
| 15 | السفر إلى مشهد | P0 | `/mashhad-holy-city` | H2/H3, Anchor, Body(exact) | Verified — Direct Match | الرئيسية / دليل السفر إلى مشهد / مشهد المقدسة دليل مشهد المقدسة · معلومات ل… |
| 16 | السياحة في مشهد | P0 | `/mashhad-holy-city` | Body(exact) | Verified — Direct Match | …ية في إيران دليل الزوار والسياحة في مشهد أسئلة شائعة كم يوماً أحتاج لزيارة مشهد؟ يعتم… |
| 17 | حرم الإمام الرضا | P0 | `/guide-ziyarah-imam-reza` | Title, Meta, H1, H2/H3, Anchor, Body(exact) | Verified — Direct Match | …فر إلى مشهد / دليل زيارة حرم الإمام الرضا في مشهد للزائر العربي دليل السفر إلى مشهد ·… |
| 18 | حرم الامام الرضا | P0 | `/imam-reza-shrine-tour-courtyards` | Title, Meta, H1, H2/H3, FAQ, Anchor, Body(exact) | Verified — Direct Match | …بة المختصرة تبدأ جولة في حرم الامام الرضا و جولة في ضريح الامام الرضا (وتُكتب على اللا… |
| 19 | زيارة الامام الرضا | P0 | `/guide-ziyarah-imam-reza` | Body(norm) | Verified — Normalized Arabic Variant | …إلى مشهد · زيارة الإمام الرضا، مرقد وضريح الإمام الرضا، الحرم الرضوي… |
| 20 | زيارة الامام علي الرضا | P1 | `/guide-ziyarah-imam-reza` | Body(norm) | Verified — Normalized Arabic Variant | …موسى الرضا (أو زيارة الإمام علي الرضا عليه السلام) محور رحلة كثير من… |
| 21 | زيارة الامام الرضا عليه السلام | P1 | `/guide-ziyarah-imam-reza` | Body(norm) | Verified — Normalized Arabic Variant | …الإجابة المختصرة تبدأ زيارة الإمام الرضا عليه السلام ( زيارة مرقد الإمام الرضا )… |
| 22 | زيارة الامام علي بن موسى الرضا | P1 | `/guide-ziyarah-imam-reza` | Body(norm) | Verified — Normalized Arabic Variant | …إلى مشهد وتأدية زيارة الإمام علي بن موسى الرضا (أو زيارة الإمام علي الرضا عليه… |
| 23 | زيارة الرضا عليه السلام | P1 | `/guide-ziyarah-imam-reza` | Body(exact) | Verified — Direct Match | …الأساسيات عند التخطيط لـ زيارة الرضا عليه السلام (وتُكتب في المراجع العربية أيضاً زيارة الإما… |
| 24 | زيارة علي ابن موسى الرضا | P1 | `/guide-ziyarah-imam-reza` | Body(exact) | Verified — Direct Match | …يارة الإمام علي الرضا أو زيارة علي ابن موسى الرضا )، حدد وقتاً مرناً للزيارة واترك مساحة للراح… |
| 25 | زيارة الامام الرضا ع | P1 | `/guide-ziyarah-imam-reza` | Mapped to: زيارة الإمام الرضا عليه السلام | Abbreviated honorific variant mapped | …هد الإجابة المختصرة تبدأ زيارة الإمام الرضا عليه السلام ( زيارة مرقد الإمام الرضا ) في مشهد بالتحضير… |
| 26 | جولة في حرم الامام الرضا | P0 | `/imam-reza-shrine-tour-courtyards` | Title, H1, Body(exact) | Verified — Direct Match | …ً. الإجابة المختصرة تبدأ جولة في حرم الامام الرضا و جولة في ضريح الامام الرضا (وتُكتب على اللا… |
| 27 | جولة في ضريح الامام الرضا | P0 | `/imam-reza-shrine-tour-courtyards` | Body(exact) | Verified — Direct Match | …لة في حرم الامام الرضا و جولة في ضريح الامام الرضا (وتُكتب على اللافتات المحلية أحياناً «حرم ام… |
| 28 | ضريح الامام الرضا | P1 | `/imam-reza-shrine-tour-courtyards` | H2/H3, Body(exact) | Verified — Direct Match | …م الامام الرضا و جولة في ضريح الامام الرضا (وتُكتب على اللافتات المحلية أحياناً «حرم ام… |
| 29 | مرقد الامام الرضا | P1 | `/guide-ziyarah-imam-reza` | Anchor, Body(norm) | Verified — Direct Match | …السلام ( زيارة مرقد الإمام الرضا ) في مشهد بالتحضير العملي قبل… |
| 30 | مشهد ايران | P0 | `/mashhad-holy-city` | Body(exact) | Verified — Direct Match | …ل شامل للزائر العربي إلى مشهد ايران : محور السياحة الدينية في إيران وزيارة حرم ا… |
| 31 | السياحة الدينية في إيران | P1 | `/mashhad-holy-city` | Body(exact) | Verified — Direct Match | …بي إلى مشهد ايران : محور السياحة الدينية في إيران وزيارة حرم الإمام الرضا، السياحة للعائلات في… |
| 32 | الزيارة إلى مشهد | P1 | `/guide-ziyarah-imam-reza` | Body(exact) | Verified — Direct Match | …حرم الإمام الرضا . تُعد الزيارة إلى مشهد وتأدية زيارة الإمام علي بن موسى الرضا (أو زي… |
| 33 | زیارت امام رضا | P2 | `/guide-ziyarah-imam-reza` | Mapped to: زيارة الإمام الرضا | Cross-script Persian variant mapped | …بي دليل السفر إلى مشهد · زيارة الإمام الرضا، مرقد وضريح الإمام الرضا، الحرم الرضوي دليل… |
| 34 | زيارة مرقد الإمام الرضا | P1 | `/guide-ziyarah-imam-reza` | Body(exact) | Verified — Direct Match | …إمام الرضا عليه السلام ( زيارة مرقد الإمام الرضا ) في مشهد بالتحضير العملي قبل دخول الحرم الر… |
| 35 | زيارة مشهد من العراق | P0 | `/mashhad-from-iraq` | Body(exact) | Verified — Direct Match | …جابة المختصرة تبدأ خطوات زيارة مشهد من العراق ومسار السفر إلى إيران من العراق إما بالطيران… |
| 36 | رحلة دينية إلى مشهد | P1 | `/mashhad-holy-city` | Body(exact) | Verified — Direct Match | …على بحر قزوين)، إذ تجمع رحلة دينية إلى مشهد بين زيارة حرم الإمام الرضا عليه السلام وأجوا… |
| 37 | السفر إلى مشهد من بغداد | P0 | `/mashhad-from-iraq` | H2/H3, Body(exact) | Verified — Direct Match | …ران . اختر طريقة الوصول: السفر إلى مشهد من بغداد والنجف والبصرة وكربلاء لا يوجد جدول واحد ثاب… |
| 38 | السفر إلى مشهد من البصرة | P0 | `/mashhad-from-iraq` | Body(exact) | Verified — Direct Match | …سفر إلى مشهد من النجف أو السفر إلى مشهد من البصرة . قارن تاريخ السفر الفعلي، ومطار المغادرة، و… |
| 39 | السفر إلى مشهد من النجف | P0 | `/mashhad-from-iraq` | Body(exact) | Verified — Direct Match | …سفر إلى مشهد من بغداد أو السفر إلى مشهد من النجف أو السفر إلى مشهد من البصرة . قارن تاريخ الس… |
| 40 | كم تكلفة السفر إلى مشهد | P0 | `/mashhad-trip-cost` | H2/H3, Body(exact) | Verified — Direct Match | …لعائلة الإجابة المختصرة: كم تكلفة السفر إلى مشهد؟ لمن يسأل كم تكلفة السفر إلى مشهد : وفق نطاق… |
| 41 | أفضل وقت لزيارة مشهد | P1 | `/best-time-to-visit-mashhad` | Title, H1, FAQ, Body(exact) | Verified — Direct Match | …/ دليل السفر إلى مشهد / أفضل وقت لزيارة مشهد: الطقس والازدحام والتخطيط دليل السفر إلى مشه… |
| 42 | كم يوم تكفي لزيارة مشهد | P1 | `/mashhad-3-day-itinerary` | H2/H3, Body(exact) | Verified — Direct Match | …ة أيام الإجابة المختصرة: كم يوم تكفي لزيارة مشهد؟ يتساءل كثير من الزوار كم يوم تكفي لزيارة مش… |
| 43 | السياحة للعائلات في مشهد | P1 | `/mashhad-family-travel` | Body(exact) | Verified — Direct Match | …رة الإجابة المختصرة تنجح السياحة للعائلات في مشهد عندما تُنظّم حول احتياجات الأطفال وكبار السن… |
| 44 | فنادق مشهد | P0 | `/hotels-near-shrine-comparison` | Title, Meta, H1, H2/H3, Anchor, Body(exact) | Verified — Direct Match | …ئيسية / المدونة / مقارنة فنادق مشهد فنادق مشهد القريبة من حرم الإمام الرضا: مقار… |
| 45 | فنادق في مشهد | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …ادق مشهد أو المفاضلة بين فنادق في مشهد (ضمن أبرز ما يبحث عنه الزوار تحت مسميات فناد… |
| 46 | الإقامة في مشهد | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …تصرة عند التخطيط لخيارات الإقامة في مشهد والبحث عن فنادق مشهد أو المفاضلة بين فنادق ف… |
| 47 | حجز فنادق مشهد | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …تمام حجز فندق في مشهد أو حجز فنادق مشهد ومراجعة حجوزات فنادق مشهد ، ابدأ بتحديد مدخل… |
| 48 | حجز فندق في مشهد | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …نادق ايران مشهد ) لإتمام حجز فندق في مشهد أو حجز فنادق مشهد ومراجعة حجوزات فنادق مشهد… |
| 49 | فندق في مشهد | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …ايران مشهد ) لإتمام حجز فندق في مشهد أو حجز فنادق مشهد ومراجعة حجوزات فنادق مشهد… |
| 50 | فندق مشهد | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …إذ تختلف حاجة الباحث عن فندق مشهد لليلة عمل عابرة عن حاجة أسرة تبحث عن حجز فند… |
| 51 | حجوزات فنادق مشهد | P0 | `/hotels-near-shrine-comparison` | H2/H3, Body(exact) | Verified — Direct Match | …و حجز فنادق مشهد ومراجعة حجوزات فنادق مشهد ، ابدأ بتحديد مدخل الحرم المناسب لعائلتك. وس… |
| 52 | فنادق ايران | P1 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …حث عنه الزوار تحت مسميات فنادق ايران أو فنادق ايران مشهد ) لإتمام حجز فندق في مشه… |
| 53 | فنادق رخيصة | P1 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …خمة في مشهد أو تقارن بين فنادق رخيصة و أرخص فنادق مشهد للعثور على فندق قريب من حر… |
| 54 | افضل فنادق مشهد | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …ار فندق في مشهد أو تقييم افضل فنادق مشهد و فنادق قريبة من حرم الإمام الرضا قرار عملي… |
| 55 | فندق قريب من حرم الإمام الرضا | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …خص فنادق مشهد للعثور على فندق قريب من حرم الإمام الرضا ، فالمقارنة الصحيحة تقوم على مسار المشي الفع… |
| 56 | فنادق ايران مشهد | P1 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …حت مسميات فنادق ايران أو فنادق ايران مشهد ) لإتمام حجز فندق في مشهد أو حجز فنادق مشهد… |
| 57 | فندق درويشي | P1 | `/darvishi-hotel-mashhad` | Title, Meta, H1, H2/H3, FAQ, Anchor, Body(exact) | Verified — Direct Match | …يسية / فنادق قرب الحرم / فندق درويشي الملكي مشهد فنادق ٥ نجوم في مشهد · شارع الإم… |
| 58 | فندق قصرالدولي | P0 | `/qasr-hotel-mashhad` | Mapped to: فندق قصر الدولي | Unspaced orthographic variant mapped | …ويال) الخاصة بالعرسان في فندق قصر الدولي في شارع الإمام الرضا بمشهد. فئة راقية · غرف… |
| 59 | فندق مدينة الرضا | P1 | `/madinat-al-reza-hotel-mashhad` | Title, Meta, H1, H2/H3, FAQ, Body(exact) | Verified — Direct Match | …يسية / فنادق قرب الحرم / فندق مدينة الرضا مشهد فنادق شارع شيرازي · فئة ٥ نجوم فندق مدي… |
| 60 | هتل آپارتمان نوين مشهد | P2 | `/hotels-near-shrine-comparison` | Mapped to: شقق نوين الفندقية (شارع بهجت) | Cross-script Persian variant mapped | …في شوارع بهجت وشيرازي (كشقق نوين الفندقية وغيرها). وبسبب تداخل مسارات المشي والمرور قر… |
| 61 | هتل های مشهد | P2 | `/hotels-near-shrine-comparison` | Mapped to: فنادق مشهد | Cross-script Persian variant mapped | …ئيسية / المدونة / مقارنة فنادق مشهد فنادق مشهد القريبة من حرم الإمام الرضا: مقار… |
| 62 | شقق مفروشة في مشهد | P1 | `/mashhad-apartment-rental-guide` | Body(exact) | Verified — Direct Match | …في مشهد أو المفاضلة بين شقق مفروشة في مشهد و شقق فندقية بالقرب من الحرم للإقامات العائل… |
| 63 | شقق فندقية في مشهد | P1 | `/boshra-arman-apartments-mashhad` | Body(exact) | Verified — Direct Match | …لات الكبيرة والباحثين عن شقق فندقية في مشهد و شقق فندقية بالقرب من الحرم بتكلفة أهدأ من… |
| 64 | فنادق قريبة من حرم الإمام الرضا | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …تقييم افضل فنادق مشهد و فنادق قريبة من حرم الإمام الرضا قرار عملي يتأثر بمدخل الحرم الذي ستستخدمه، و… |
| 65 | فنادق خمس نجوم في مشهد | P1 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …ائلتك. وسواء كنت تبحث عن فنادق خمس نجوم في مشهد أو فنادق فخمة في مشهد أو تقارن بين فنادق رخي… |
| 66 | أرخص فنادق مشهد | P1 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …تقارن بين فنادق رخيصة و أرخص فنادق مشهد للعثور على فندق قريب من حرم الإمام الرضا ، ف… |
| 67 | فنادق فخمة في مشهد | P1 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …نادق خمس نجوم في مشهد أو فنادق فخمة في مشهد أو تقارن بين فنادق رخيصة و أرخص فنادق مشهد ل… |
| 68 | حجز فندق قريب من الحرم | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …برة عن حاجة أسرة تبحث عن حجز فندق قريب من الحرم لعدة أيام. تعرض هذه الصفحة مقارنة مرجعية لأب… |
| 69 | شقق فندقية بالقرب من الحرم | P1 | `/boshra-arman-apartments-mashhad` | Body(exact) | Verified — Direct Match | …عن شقق فندقية في مشهد و شقق فندقية بالقرب من الحرم بتكلفة أهدأ من فنادق الخمس نجوم، تبرز ثلاثة… |
| 70 | استئجار شقة في مشهد | P1 | `/mashhad-apartment-rental-guide` | Title, FAQ, Body(exact) | Verified — Direct Match | …المختصرة عند التخطيط لـ استئجار شقة في مشهد أو المفاضلة بين شقق مفروشة في مشهد و شقق فند… |
| 71 | خصومات فنادق مشهد | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …الفندق ونسبة الإشغال ضمن خصومات فنادق مشهد الموسمية (دون ضمان نسبة ثابتة)، بينما ترتفع… |
| 72 | أسعار الفنادق في مشهد | P0 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …نسبة ثابتة)، بينما ترتفع أسعار الفنادق في مشهد وتقل نسبة الخصم في الأعياد والمناسبات الديني… |
| 73 | السياحة الطبية في ايران | P1 | `/health-tourism` | Title, Meta, H1, Body(norm) | Verified — Direct Match | H1: السياحة الطبية في إيران ومشهد: لنرتّب تفاصيل السفر والعلاج أولاً. |
| 74 | السياحة العلاجية | P1 | `/health-tourism` | Anchor, Body(exact) | Verified — Direct Match | الرئيسية / السياحة العلاجية السياحة الطبية في إيران · السياحة العلاجية و… |
| 75 | السياحة العلاجية في إيران | P1 | `/health-tourism` | Body(exact) | Verified — Direct Match | …سياحة الطبية في إيران أو السياحة العلاجية في إيران والتخطيط لرحلة العلاج في إيران ومشهد، ابدأ ب… |
| 76 | العلاج في مشهد | P1 | `/health-tourism` | Body(exact) | Verified — Direct Match | …إذا كنت تخطط للسفر بغرض العلاج في مشهد أو ضمن مسارات السياحة العلاجية، يمكننا مناقش… |
| 77 | العلاج في ايران | P1 | `/health-tourism` | Body(norm) | Verified — Normalized Arabic Variant | …إيران والتخطيط لرحلة العلاج في إيران ومشهد، ابدأ بتحديد التخصص الطبي المطلوب… |
| 78 | علاج العقم | P1 | `/infertility-treatment-mashhad` | Title, H1, H2/H3, Anchor, Body(exact) | Verified — Direct Match | …سية / السياحة العلاجية / علاج العقم وأطفال الأنابيب في مشهد طب الإخصاب والأسرة ·… |
| 79 | علاج العقم في ايران | P1 | `/infertility-treatment-mashhad` | Title, H1, Body(norm) | Verified — Direct Match | H1: علاج العقم في إيران والحقن المجهري بمشهد: التحضير والتوقيت |
| 80 | علاج العقم فی ایران | P1 | `/infertility-treatment-mashhad` | Title, H1, Body(norm) | Verified — Direct Match | H1: علاج العقم في إيران والحقن المجهري بمشهد: التحضير والتوقيت |
| 81 | علاج العقم عند الرجال | P1 | `/infertility-treatment-mashhad` | H2/H3, Body(exact) | Verified — Direct Match | …مي للمريض العربي في مشهد علاج العقم عند الرجال والنساء والحقن المجهري (ICSI) في خطط علاج ال… |
| 82 | علاج العقم عند النساء | P1 | `/infertility-treatment-mashhad` | Body(exact) | Verified — Direct Match | …قال لخطوة الحقن المجهري. علاج العقم عند النساء: يركّز على تقييم مخزون المبيض (AMH)، سلامة ق… |
| 83 | علاج العقم في طهران | P2 | `/infertility-treatment-mashhad` | Body(exact) | Verified — Direct Match | …ثير من الأزواج العرب بين علاج العقم في طهران ومشهد: تضم طهران مراكز بحثية ومستشفيات كبرى… |
| 84 | علاج العقم للرجال | P1 | `/infertility-treatment-mashhad` | Body(exact) | Verified — Direct Match | …علاج العقم عند الرجال (وعلاج العقم للرجال التخصصي): يشمل تقييم جودة السائل المنوي والح… |
| 85 | أطفال الأنابيب في إيران | P1 | `/ivf-centers-mashhad` | Title, Meta, H1, FAQ, Body(exact) | Verified — Direct Match | …ز أطفال الأنابيب في مشهد أطفال الأنابيب في إيران · مقارنة مراكز الإخصاب في مشهد أطفال الأنابي… |
| 86 | أطفال الأنابيب | P1 | `/ivf-centers-mashhad` | Title, Meta, H1, H2/H3, FAQ, Body(exact) | Verified — Direct Match | …/ مستشفيات مشهد / مراكز أطفال الأنابيب في مشهد أطفال الأنابيب في إيران · مقارنة مرا… |
| 87 | تجارب أطفال الأنابيب | P1 | `/ivf-centers-mashhad` | H2/H3, FAQ, Body(exact) | Verified — Direct Match | …هاق التنقل اليومي. قراءة تجارب أطفال الأنابيب وعوامل نجاح أطفال الأنابيب بواقعية طبية يبحث… |
| 88 | عملية أطفال الأنابيب | P1 | `/ivf-centers-mashhad` | Body(exact) | Verified — Direct Match | …ب الزوجين عند التخطيط لـ عملية أطفال الأنابيب أو مقارنة تكلفة علاج العقم في إيران و تكلفة… |
| 89 | تكلفة أطفال الأنابيب | P1 | `/ivf-centers-mashhad` | Meta, H2/H3, FAQ, Body(exact) | Verified — Direct Match | …وتغطية الرعاية التوليدية تكلفة أطفال الأنابيب وتكلفة الحقن المجهري في مشهد السؤال الأهم لد… |
| 90 | مراكز أطفال الأنابيب | P1 | `/ivf-centers-mashhad` | H2/H3, FAQ, Body(exact) | Verified — Direct Match | …علاجية / مستشفيات مشهد / مراكز أطفال الأنابيب في مشهد أطفال الأنابيب في إيران · مقارنة مرا… |
| 91 | نجاح أطفال الأنابيب | P1 | `/ivf-centers-mashhad` | H2/H3, Body(exact) | Verified — Direct Match | …رب أطفال الأنابيب وعوامل نجاح أطفال الأنابيب بواقعية طبية يبحث كثيرون عن تجارب أطفال الأن… |
| 92 | عمليات تجميل الانف في ايران | P1 | `/rhinoplasty-mashhad` | Title, H1, Body(norm) | Verified — Direct Match | H1: عمليات تجميل الأنف في إيران ومشهد: التحقق من الجراح وجدول النقاهة |
| 93 | تجميل الانف في ايران | P1 | `/rhinoplasty-mashhad` | Title, Meta, H1, H2/H3, Body(norm) | Verified — Direct Match | H1: عمليات تجميل الأنف في إيران ومشهد: التحقق من الجراح وجدول النقاهة |
| 94 | افضل دكتور تجميل الانف في ايران | P1 | `/rhinoplasty-mashhad` | H2/H3, Body(norm) | Verified — Direct Match | Heading: معايير التحقق من أفضل دكتور تجميل الأنف في إيران ومشهد |
| 95 | عمليات تجميل الانف في ايران وتكلفتها | P1 | `/rhinoplasty-mashhad` | Body(norm) | Verified — Normalized Arabic Variant | …في إيران وتكاليف عمليات تجميل الأنف في إيران وتكلفتها التفصيلية بحسب خبرة الجراح والمستشفى وما… |
| 96 | افضل دكتور تجميل الانف | P1 | `/rhinoplasty-mashhad` | H2/H3, Body(norm) | Verified — Direct Match | Heading: معايير التحقق من أفضل دكتور تجميل الأنف في إيران ومشهد |
| 97 | دكتور التجميل في ايران | P2 | `/rhinoplasty-mashhad` | Body(norm) | Verified — Normalized Arabic Variant | …إيران مشهد أو دكتور التجميل في إيران )؛ غير أن المعيار الطبي السليم… |
| 98 | دكتور تجميل الانف في ايران مشهد | P1 | `/rhinoplasty-mashhad` | Body(norm) | Verified — Normalized Arabic Variant | …البحث المباشر عن دكتور تجميل الأنف في إيران مشهد أو دكتور التجميل في إيران )؛… |
| 99 | تكلفة الحقن المجهري في مشهد | P1 | `/ivf-centers-mashhad` | Body(exact) | Verified — Direct Match | …ة علاج العقم في إيران أو تكلفة الحقن المجهري في مشهد كتابةً، وراجع خطوات التحضير في دليل علاج الع… |
| 100 | مراكز أطفال الأنابيب في مشهد | P1 | `/ivf-centers-mashhad` | H2/H3, Body(exact) | Verified — Direct Match | …علاجية / مستشفيات مشهد / مراكز أطفال الأنابيب في مشهد أطفال الأنابيب في إيران · مقارنة مراكز الإخص… |
| 101 | علاج تأخر الحمل في مشهد | P1 | `/infertility-treatment-mashhad` | Body(exact) | Verified — Direct Match | …لاج العقم في إيران ومجال علاج تأخر الحمل في مشهد بتقييم طبي مشترك للزوجين، وتُضبط مسارات الحق… |
| 102 | أفضل مراكز علاج العقم في إيران | P1 | `/ivf-centers-mashhad` | H2/H3, Body(exact) | Verified — Direct Match | …تيار أي جهة ضمن البحث عن أفضل مراكز علاج العقم في إيران ، قارن ترخيص المختبر وتفاصيل تكلفة علاج العق… |
| 103 | تكلفة علاج العقم في إيران | P1 | `/ivf-centers-mashhad` | Body(exact) | Verified — Direct Match | …رن ترخيص المختبر وتفاصيل تكلفة علاج العقم في إيران أو تكلفة الحقن المجهري في مشهد كتابةً، وراجع… |
| 104 | علاج العقم بعد فشل أطفال الأنابيب | P1 | `/infertility-treatment-mashhad` | H2/H3, Body(exact) | Verified — Direct Match | …ن ومراكز الإخصاب بمشهد . علاج العقم بعد فشل أطفال الأنابيب والمقارنة بين مشهد وطهران عند التخطيط لـ علا… |
| 105 | أفضل مستشفيات مشهد | P1 | `/hospitals-mashhad` | H2/H3, Body(exact) | Verified — Direct Match | …بة المختصرة عند البحث عن أفضل مستشفيات مشهد لحالتك، يعتمد الاختيار الموضوعي على ترخيص قس… |
| 106 | علاج السرطان في إيران | P1 | `/cancer-treatment-mashhad` | H2/H3, Body(exact) | Verified — Direct Match | …ض الأورام لمتابعة خيارات علاج السرطان في إيران أو مشهد قبل مراجعة تقارير الخزعة (Pathology)… |
| 107 | زراعة الشعر في مشهد | P1 | `/hair-transplant-mashhad` | Title, H1, H2/H3, FAQ, Body(exact) | Verified — Direct Match | …سية / السياحة العلاجية / زراعة الشعر في مشهد زراعة الشعر واللحية · تخطيط السفر والتحقق ال… |
| 108 | عملية تجميل الأنف في مشهد | P1 | `/rhinoplasty-mashhad` | Body(exact) | Verified — Direct Match | …الأنف في إيران أو ترتيب عملية تجميل الأنف في مشهد إلى تخصيص ٧–١٠ أيام متصلة غالباً، بحيث تشمل… |
| 109 | تكلفة تجميل الأنف في إيران | P1 | `/rhinoplasty-mashhad` | H2/H3, Body(exact) | Verified — Direct Match | …ي دليل تكلفة رحلة مشهد . تكلفة تجميل الأنف في إيران وميزانية الإقامة لـ ٨–١٠ أيام (استرشادي) تتب… |
| 110 | استقبال مطار مشهد | P1 | `/mashhad-airport-to-shrine` | Title, Meta, H1, Body(exact) | Verified — Direct Match | …/ دليل السفر إلى مشهد / استقبال مطار مشهد والانتقال إلى الحرم دليل السفر إلى مشهد · اس… |
| 111 | سيارة مع سائق في مشهد | P1 | `/arabic-driver-guide-mashhad` | H1, Body(exact) | Verified — Direct Match | …ومرافق ومرشد سياحي عربي سيارة مع سائق في مشهد ومترجم عربي ثقة ومرشد سياحي عربي الإجابة الم… |
| 112 | مترجم عربي في مشهد | P1 | `/arabic-driver-guide-mashhad` | Body(exact) | Verified — Direct Match | …و سائق خاص في مشهد برفقة مترجم عربي في مشهد (وهو مترجم عربي موثوق في مشهد ) أو مرشد سياح… |
| 113 | مرشد سياحي عربي في مشهد | P1 | `/arabic-driver-guide-mashhad` | Body(exact) | Verified — Direct Match | …عربي موثوق في مشهد ) أو مرشد سياحي عربي في مشهد يزيل حاجز اللغة الفارسية في استقبال المطار،… |
| 114 | مترجم عربي ثقة في مشهد | P1 | `/arabic-driver-guide-mashhad` | Body(exact) | Verified — Direct Match | …مع مرافق عربي في مشهد و مترجم عربي ثقة في مشهد يتقن العربية والفارسية ويفهم احتياجات العائل… |
| 115 | شارع شيرازي في مشهد | P1 | `/madinat-al-reza-hotel-mashhad` | H2/H3, Body(exact) | Verified — Direct Match | …ا من فئة ٥ نجوم في بداية شارع شيرازي في مشهد ، حيث يبعد نحو ٨٣ متراً (٣ دقائق سيراً) من م… |
| 116 | شارع بهجت في مشهد | P1 | `/hotels-near-shrine-comparison` | Body(exact) | Verified — Direct Match | …اً. كما يمتد شمالاً نطاق شارع بهجت في مشهد (محور آية الله بهجت وبداية بوابة الشيخ الطوس… |
| 117 | استقبال من مطار مشهد | P1 | `/mashhad-airport-to-shrine` | Meta, Body(exact) | Verified — Direct Match | …رم دليل السفر إلى مشهد · استقبال من مطار مشهد، نقل من مطار مشهد إلى الحرم استقبال مطار مشه… |
| 118 | نقل من مطار مشهد إلى الحرم | P1 | `/mashhad-airport-to-shrine` | Meta, Body(exact) | Verified — Direct Match | …· استقبال من مطار مشهد، نقل من مطار مشهد إلى الحرم استقبال مطار مشهد ونقل من مطار مشهد إلى الحر… |
| 119 | سيارة خاصة في مشهد | P1 | `/arabic-driver-guide-mashhad` | Meta, Body(exact) | Verified — Direct Match | …ليجية واللبنانية عند حجز سيارة خاصة في مشهد . التنسيق المسبق للنقل الخاص والمرافقة العرب… |
| 120 | سيارة مع سائق عربي في مشهد | P1 | `/arabic-driver-guide-mashhad` | Title, Meta, Body(exact) | Verified — Direct Match | …مع الأسرة أو للعلاج إلى سيارة مع سائق عربي في مشهد أو سائق خاص في مشهد برفقة مترجم عربي في مشهد… |
| 121 | سائق خاص في مشهد | P1 | `/arabic-driver-guide-mashhad` | Body(exact) | Verified — Direct Match | …مع سائق عربي في مشهد أو سائق خاص في مشهد برفقة مترجم عربي في مشهد (وهو مترجم عربي موث… |
| 122 | مترجم عربي موثوق في مشهد | P1 | `/arabic-driver-guide-mashhad` | Meta, Body(exact) | Verified — Direct Match | …مترجم عربي في مشهد (وهو مترجم عربي موثوق في مشهد ) أو مرشد سياحي عربي في مشهد يزيل حاجز اللغة… |
| 123 | مرافق عربي في مشهد | P1 | `/arabic-driver-guide-mashhad` | Body(exact) | Verified — Direct Match | …أو السوق، وبين العمل مع مرافق عربي في مشهد و مترجم عربي ثقة في مشهد يتقن العربية والفار… |
| 124 | مترجم طبي في مشهد | P1 | `/arabic-driver-guide-mashhad` | Body(exact) | Verified — Direct Match | …، والمراجعات الصحية عبر مترجم طبي في مشهد . كما تشمل هذه المرافقة خدمات للزوار العراقي… |
| 125 | خدمات للزوار العراقيين في مشهد | P1 | `/arabic-driver-guide-mashhad` | Body(exact) | Verified — Direct Match | …. كما تشمل هذه المرافقة خدمات للزوار العراقيين في مشهد والخليجيين مع تثبيت السعر الإجمالي وساعات ال… |
| 126 | السفر إلى إيران من العراق | P0 | `/mashhad-from-iraq` | Title, Meta, H1, H2/H3, Body(exact) | Verified — Direct Match | …/ دليل السفر إلى مشهد / السفر إلى إيران من العراق وزيارة مشهد دليل السفر إلى إيران من العراق ·… |
| 127 | السفر من العراق إلى إيران | P0 | `/mashhad-from-iraq` | Body(exact) | Verified — Direct Match | …أ رحلة الزائر العراقي في السفر من العراق إلى إيران باتجاه مشهد بتحديد موعد السفر وطريقة الوصول… |
| 128 | السفر الي ايران | P1 | `/iran-visa-requirements-arab-travelers` | H2/H3, FAQ, Body(norm) | Verified — Direct Match | Heading: السفر إلى إيران لغرض العلاج |
| 129 | السياحة في ايران | P1 | `/mashhad-holy-city` | H2/H3, Body(exact) | Verified — Direct Match | …ينة مشهد مكانة مركزية في السياحة في ايران ؛ فهي تختلف عن طهران (باعتبارها العاصمة الإد… |
| 130 | بغداد | P0 | `/mashhad-from-iraq` | Meta, H2/H3, FAQ, Anchor, Body(exact) | Verified — Direct Match | …فر إلى إيران من العراق · بغداد، النجف، البصرة، كربلاء إلى مشهد السفر إلى إي… |
| 131 | تأشيرة إيران للعراقيين | P0 | `/iran-visa-requirements-arab-travelers` | H2/H3, Body(exact) | Verified — Direct Match | …مع تعدد أسئلة الزوار حول تأشيرة إيران للعراقيين أو المستمسكات المطلوبة للسفر إلى إيران ، تبق… |
| 132 | شروط السفر إلى إيران للعراقيين | P0 | `/iran-visa-requirements-arab-travelers` | Body(exact) | Verified — Direct Match | …تأشيرة إيران للعراقيين و شروط السفر إلى إيران للعراقيين استفسارات المسافرين قبل التخطيط للزيارة جواً… |
| 133 | المستمسكات المطلوبة للسفر إلى إيران | P0 | `/iran-visa-requirements-arab-travelers` | Body(exact) | Verified — Direct Match | …أشيرة إيران للعراقيين أو المستمسكات المطلوبة للسفر إلى إيران ، تبقى المراجعة المباشرة للبوابة الرسمية وال… |
| 134 | السفر من العراق إلى مشهد براً | P1 | `/iraq-to-mashhad-overland` | Body(exact) | Verified — Direct Match | …ق. الإجابة المختصرة يمكن السفر من العراق إلى مشهد براً ، لكن مسار الرحلة وزمن الوصول يعتمدان على مد… |
| 135 | الرحلة من بغداد إلى مشهد | P0 | `/mashhad-from-iraq` | Body(exact) | Verified — Direct Match | …خير. بغداد (BGW) قد تظهر الرحلة من بغداد إلى مشهد بشكل مباشر في بعض الأيام، كما تتوفر مسارات ر… |
| 136 | معلومات السفر إلى إيران | P1 | `/mashhad-from-iraq` | Body(exact) | Verified — Direct Match | …د الرحلة، لذلك يجب تأكيد معلومات السفر إلى إيران من المصادر الرسمية قبل الحجز. وصول الزائر ال… |
| 137 | السفر الي مشهد | P0 | `/mashhad-holy-city` | H2/H3, Anchor, Body(norm) | Verified — Direct Match | Heading: السفر إلى مشهد للشباب والعزاب |
| 138 | قبل السفر الي ايران | P1 | `/iran-visa-requirements-arab-travelers` | Body(norm) | Verified — Normalized Arabic Variant | …تجربة مسافر آخر قبل السفر إلى إيران ؛ تحقّق من الشروط التي تظهر… |
| 139 | شهر العسل في مشهد | P3 | `/honeymoon-couples-mashhad` | Title, Meta, H1, H2/H3, FAQ, Body(exact) | Verified — Direct Match | …يسية / فنادق قرب الحرم / شهر العسل في مشهد سياحة الأزواج والعرسان · أجنحة رويال الخاصة… |
| 140 | شهر العسل في إيران | P3 | `/honeymoon-couples-mashhad` | H2/H3, Body(exact) | Verified — Direct Match | …ال في فندق قصر مشهد رحلة شهر العسل في إيران؟ يخلط كثير من الزوار عند تخطيط شهر العسل في… |
| 141 | رحلة شهر العسل إلى إيران | P3 | `/honeymoon-couples-mashhad` | Body(exact) | Verified — Direct Match | …م. الإجابة المختصرة تجمع رحلة شهر العسل إلى إيران وخاصة شهر العسل في مشهد بين البركة الروحية ف… |
| 142 | فنادق شهر العسل في مشهد | P3 | `/honeymoon-couples-mashhad` | Meta, FAQ, Body(exact) | Verified — Direct Match | …ات السياحية. أبرز خيارات فنادق شهر العسل في مشهد لمن يبحث عن جناح رومانسي في مشهد هي أجنحة رو… |
| 143 | جناح رومانسي في مشهد | P3 | `/honeymoon-couples-mashhad` | Meta, Body(exact) | Verified — Direct Match | …لعسل في مشهد لمن يبحث عن جناح رومانسي في مشهد هي أجنحة رويال الخاصة بالعرسان في فندق قصر ا… |
| 144 | برنامج شهر عسل في إيران | P3 | `/honeymoon-couples-mashhad` | Meta, H2/H3, Body(exact) | Verified — Direct Match | …للحرم في الأولوية الأولى برنامج شهر عسل في إيران: ٤ أيام هادئة في مشهد للأزواج لكل زوجين يبحث… |
| 145 | سياحة الأزواج في مشهد | P3 | `/honeymoon-couples-mashhad` | Body(exact) | Verified — Direct Match | …ي و فندق ألماس ٢ . وتُعد سياحة الأزواج في مشهد خياراً مكملاً لمن يرغب ببرنامج هادئ خارج موا… |
| 146 | السفر الفردي إلى إيران | P3 | `/solo-youth-travel-mashhad` | Meta, Body(exact) | Verified — Direct Match | …المختصرة لمن يخطط لتجربة السفر الفردي إلى إيران أو السفر إلى مشهد للشباب (سواء كنت تخطط لتجر… |
| 147 | السفر إلى إيران للشباب | P3 | `/solo-youth-travel-mashhad` | Body(exact) | Verified — Direct Match | …إيران بمفردي أو تسأل عن السفر إلى إيران للشباب وتنظيم رحلة شباب إلى مشهد )، القاعدة العملية… |
| 148 | السفر إلى مشهد للشباب | P3 | `/solo-youth-travel-mashhad` | Title, H1, Body(exact) | Verified — Direct Match | …تكلفة وميزانية الرحلة / السفر إلى مشهد للشباب والعزاب دليل السفر الفردي والشبابي · السكن،… |
| 149 | رحلة شباب إلى مشهد | P3 | `/solo-youth-travel-mashhad` | Body(exact) | Verified — Direct Match | …إلى إيران للشباب وتنظيم رحلة شباب إلى مشهد )، القاعدة العملية بسيطة: احجز غرفة فردية أو… |
| 150 | سياحة الرجال في مشهد | P3 | `/solo-youth-travel-mashhad` | Meta, H2/H3, Body(exact) | Verified — Direct Match | …ند الدفع. ٣. أنشطة تناسب سياحة الرجال في مشهد والرحلات الشبابية ضمن الإطار التنظيمي للمدين… |
| 151 | السفر إلى إيران للعزاب | P3 | `/solo-youth-travel-mashhad` | Meta, H2/H3, Body(exact) | Verified — Direct Match | …. السكن القانوني وخيارات السفر إلى إيران للعزاب والمجموعات يتساءل كثيرون عند التخطيط لمسار ا… |
| 152 | سياحة العزاب في إيران | P3 | `/solo-youth-travel-mashhad` | Body(exact) | Verified — Direct Match | …لسفر إلى إيران للعزاب أو سياحة العزاب في إيران وتنظيم رحلة شبابية إلى مشهد عمّا إذا كانت ال… |
| 153 | السفر الفردي إلى مشهد | P3 | `/solo-youth-travel-mashhad` | Body(exact) | Verified — Direct Match | …ات النقل ؛ والتزم بضوابط السفر الفردي إلى مشهد واللوائح العامة لضمان رحلة آمنة ومرتبة. ١. ا… |
| 154 | رحلة شبابية إلى مشهد | P3 | `/solo-youth-travel-mashhad` | Body(exact) | Verified — Direct Match | …ة العزاب في إيران وتنظيم رحلة شبابية إلى مشهد عمّا إذا كانت الفنادق تقبل المسافر المنفرد.… |
| 155 | سياحة الرجال في إيران | P3 | `/solo-youth-travel-mashhad` | Body(exact) | Verified — Direct Match | …سياحة الرجال في مشهد أو سياحة الرجال في إيران عن برامج العائلات من حيث أوقات الزيارة والأن… |
| 156 | السفر إلى إيران بمفردي | P3 | `/solo-youth-travel-mashhad` | Body(exact) | Verified — Direct Match | …اب (سواء كنت تخطط لتجربة السفر إلى إيران بمفردي أو تسأل عن السفر إلى إيران للشباب وتنظيم رحل… |
| 157 | زواج المتعة في مشهد | P3 | `/temporary-marriage-iran-legal-guide` | Body(exact) | Verified — Direct Match | …الزواج المؤقت في مشهد و زواج المتعة في مشهد لا تكتمل قانونياً دون فهم المادة ١٠٦٠ التي ت… |
| 158 | زواج مؤقت في إيران | P3 | `/temporary-marriage-iran-legal-guide` | Body(exact) | Verified — Direct Match | …ويُشار إليه أيضاً بعبارة زواج مؤقت في إيران أو زواج المتعة في الاستخدام الدارج) في الموا… |
| 159 | زواج المتعة | P3 | `/temporary-marriage-iran-legal-guide` | Title, Meta, H2/H3, Body(exact) | Verified — Direct Match | …ون المدني الإيراني أحكام زواج المتعة في إيران (ويُشار إليه أيضاً بعبارة زواج مؤقت… |
| 160 | زواج المتعة في إيران | P3 | `/temporary-marriage-iran-legal-guide` | Meta, H2/H3, Body(exact) | Verified — Direct Match | …ون المدني الإيراني أحكام زواج المتعة في إيران (ويُشار إليه أيضاً بعبارة زواج مؤقت في إيران… |
| 161 | الزواج المؤقت في مشهد | P3 | `/temporary-marriage-iran-legal-guide` | Meta, Body(exact) | Verified — Direct Match | …لزواج المؤقت في إيران أو الزواج المؤقت في مشهد و زواج المتعة في مشهد لا تكتمل قانونياً دون… |
| 162 | شروط زواج المتعة في إيران | P3 | `/temporary-marriage-iran-legal-guide` | H2/H3, Body(exact) | Verified — Direct Match | …سجيل الرسمي الإلزامي. ١. شروط زواج المتعة في إيران في القانون المدني الإيراني لتحقيق الوضوح الق… |
| 163 | عقد زواج مؤقت في مشهد | P3 | `/temporary-marriage-iran-legal-guide` | Body(exact) | Verified — Direct Match | …راقيين في إيران أو إجراء عقد زواج مؤقت في مشهد ، والحقيقة أن المسار يخضع لإجراءات رسمية مشد… |
| 164 | الزواج المؤقت للعراقيين في إيران | P3 | `/temporary-marriage-iran-legal-guide` | H2/H3, Body(exact) | Verified — Direct Match | …ايا الدول العربية وضوابط الزواج المؤقت للعراقيين في إيران يظن بعض الزوار خطأً أن القواعد المطبقة بين ا… |
| 165 | كيفية الزواج المؤقت في إيران | P3 | `/temporary-marriage-iran-legal-guide` | Body(exact) | Verified — Direct Match | …العقد. غير أن أسئلة مثل كيفية الزواج المؤقت في إيران أو الزواج المؤقت في مشهد و زواج المتعة في مش… |

---

## 6. بنود غير متحقق منها في هذه البيئة (Explicit Unverified Items)
- **النشر الحي على Vercel (`https://hossein-mashhad-tourism.vercel.app/`):** لم تُفحص الاستجابات الحية من خادم Vercel لأن العمل محصور في فرع مراجعة معزول دون تعديل `main` أو النشر.
- **Google Search Console (GSC):** لم يتوفر وصول إلى حساب GSC (لا بيانات ظهور أو نقرات أو ترتيب فعلي أو فحص تغطية الفهرس).
- **الطلب الفعلي على محرك Google حسب البلد:** البيانات الكمية الوحيدة المتوفرة مصدرها vidIQ لعمليات البحث على يوتيوب؛ طلب Google Search في العراق والكويت والبحرين وعمان وقطر والإمارات ولبنان لا يزال `Google data not yet verified` و`Country-specific demand not yet verified`.
- **أسعار الفنادق والمستشفيات الفورية وروابط المصادر الخارجية لحظياً:** تحتاج إلى تأكيد مكتوب من إدارة الفندق أو قسم المرضى الدوليين (IPD) وقت سفر العميل.
