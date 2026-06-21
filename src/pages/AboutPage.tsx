import { useLang } from "../context/LanguageContext";

export default function AboutPage() {
  const { t, isAr } = useLang();

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-12 space-y-12"
      style={{ fontFamily: "Cairo, sans-serif" }}
    >
      {/* Hero */}
      <div className={`text-center`}>
        <div className="text-8xl mb-4">📚</div>
        <h1 className="text-4xl font-black text-amber-800 mb-3">
          {t("عن مكتبة النور", "About Nour Bookstore")}
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          {t(
            "مكتبة النور — وجهتك الأولى للكتب العربية والإنجليزية بأسعار مميزة وخدمة توصيل سريعة لجميع أنحاء مصر.",
            "Nour Bookstore — your first destination for Arabic and English books at great prices with fast delivery across Egypt."
          )}
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "🎯", ar: "مهمتنا", en: "Our Mission", descAr: "نجعل المعرفة في متناول الجميع بأسعار مناسبة وجودة عالية.", descEn: "We make knowledge accessible to everyone with affordable prices and high quality." },
          { icon: "💎", ar: "جودتنا", en: "Our Quality", descAr: "نختار كتبنا بعناية فائقة لضمان أفضل تجربة قراءة.", descEn: "We carefully select our books to ensure the best reading experience." },
          { icon: "🚚", ar: "توصيلنا", en: "Our Delivery", descAr: "توصيل سريع لجميع محافظات مصر خلال 2-5 أيام عمل.", descEn: "Fast delivery to all Egyptian governorates within 2-5 business days." },
        ].map((v) => (
          <div key={v.icon} className="bg-white rounded-2xl p-6 shadow-md border border-amber-50 text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-3">{v.icon}</div>
            <h3 className="text-xl font-black text-amber-800 mb-2">{isAr ? v.ar : v.en}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{isAr ? v.descAr : v.descEn}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-600 rounded-3xl p-8 text-white">
        <h2 className="text-2xl font-black text-center mb-8">{t("أرقامنا بتتكلم", "Our Numbers Speak")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "10,000+", ar: "كتاب", en: "Books" },
            { num: "50,000+", ar: "عميل سعيد", en: "Happy Customers" },
            { num: "27", ar: "محافظة نوصلها", en: "Governorates Covered" },
            { num: "4.9/5", ar: "متوسط التقييم", en: "Average Rating" },
          ].map((s) => (
            <div key={s.num} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-yellow-300 mb-1">{s.num}</div>
              <div className="text-amber-200 text-sm">{isAr ? s.ar : s.en}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className={`bg-amber-50 rounded-3xl p-8 ${isAr ? "text-right" : "text-left"}`}>
        <h2 className="text-2xl font-black text-amber-800 mb-4">📖 {t("قصتنا", "Our Story")}</h2>
        <p className="text-gray-600 leading-relaxed text-base mb-4">
          {t(
            "بدأت مكتبة النور كحلم بسيط: أن نجعل الكتاب الجيد في متناول يد كل مصري. انطلقنا بمجموعة صغيرة من الكتب المختارة بعناية، وبمرور الوقت ومع ثقة عملائنا الكرام، نمونا لنصبح من أبرز المكتبات الإلكترونية في مصر.",
            "Nour Bookstore started as a simple dream: to make good books accessible to every Egyptian. We launched with a small carefully selected collection, and over time, thanks to the trust of our valued customers, we grew to become one of Egypt's most prominent online bookstores."
          )}
        </p>
        <p className="text-gray-600 leading-relaxed text-base">
          {t(
            "اليوم نفخر بتقديم خدمة متكاملة من الاختيار حتى التوصيل لبابك، مع دعم مستمر عبر واتساب لضمان رضاك التام.",
            "Today we are proud to offer a comprehensive service from selection to doorstep delivery, with continuous WhatsApp support to ensure your complete satisfaction."
          )}
        </p>
      </div>

      {/* Team */}
      <div className="text-center">
        <h2 className="text-2xl font-black text-amber-800 mb-6">{t("تواصل معنا", "Get in Touch")}</h2>
        <a
          href="https://wa.me/201091106322"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-green-300 transition-all hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("تحدث معنا الآن", "Chat with Us Now")}
        </a>
        <p className="text-gray-400 mt-3 text-sm">+20 109 110 6322</p>
      </div>
    </div>
  );
}
