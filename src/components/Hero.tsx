import { useLang } from "../context/LanguageContext";

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  const { t, isAr } = useLang();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-700 text-white min-h-[500px] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">📖</div>
        <div className="absolute top-20 right-20 text-6xl">📚</div>
        <div className="absolute bottom-10 left-1/4 text-7xl">✍️</div>
        <div className="absolute bottom-20 right-1/3 text-5xl">🎓</div>
        <div className="absolute top-1/2 left-1/2 text-9xl opacity-20">📖</div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-yellow-400/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-amber-300/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className={`flex-1 ${isAr ? "text-right" : "text-left"}`}>
          <div className="inline-block bg-yellow-400/20 border border-yellow-400/30 rounded-full px-4 py-1 text-yellow-200 text-sm font-semibold mb-4">
            📚 {t("أكثر من 10,000 كتاب بالعربية والإنجليزية", "Over 10,000 Books in Arabic & English")}
          </div>

          <h1
            className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
            style={{ fontFamily: isAr ? "Cairo, sans-serif" : "Playfair Display, serif" }}
          >
            {t("اكتشف عالماً", "Discover A World")} <br />
            <span className="text-yellow-300">{t("من المعرفة", "of Knowledge")}</span>
          </h1>

          <p className="text-amber-100 text-lg mb-8 max-w-lg leading-relaxed" style={{ fontFamily: "Cairo, sans-serif" }}>
            {t(
              "مكتبتك المفضلة للكتب العربية والإنجليزية — روايات، علوم، تطوير ذات، أطفال والمزيد. اطلب الآن واستلم في أسرع وقت!",
              "Your favorite bookstore for Arabic & English books — novels, science, self-help, children and more. Order now and receive quickly!"
            )}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onShopNow}
              className="bg-yellow-400 hover:bg-yellow-300 text-amber-900 font-bold px-8 py-3.5 rounded-full text-base shadow-xl hover:shadow-yellow-400/50 transition-all hover:scale-105"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              {t("تسوق الآن 🛒", "Shop Now 🛒")}
            </button>
            <a
              href="https://wa.me/201091106322"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3.5 rounded-full text-base shadow-xl transition-all hover:scale-105"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("واتساب", "WhatsApp")}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-8 flex-wrap">
            {[
              { num: "10K+", ar: "كتاب", en: "Books" },
              { num: "50K+", ar: "عميل سعيد", en: "Happy Customers" },
              { num: "4.9⭐", ar: "تقييم", en: "Rating" },
            ].map((stat) => (
              <div key={stat.num} className="text-center">
                <div className="text-2xl font-black text-yellow-300">{stat.num}</div>
                <div className="text-amber-200 text-xs">{isAr ? stat.ar : stat.en}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Book display */}
        <div className="flex-shrink-0 hidden md:flex gap-4 items-end">
          {["📗", "📕", "📘", "📙"].map((emoji, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-xl shadow-2xl"
              style={{
                width: 70 + i * 10,
                height: 100 + i * 20,
                background: `linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))`,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                marginBottom: i === 2 ? 0 : i * 8,
                transform: `rotate(${[-5, -2, 2, 5][i]}deg)`,
                fontSize: 32 + i * 4,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
