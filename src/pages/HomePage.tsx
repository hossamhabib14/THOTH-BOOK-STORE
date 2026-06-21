import { useLang } from "../context/LanguageContext";
import { books } from "../data/books";
import { Book } from "../data/books";
import BookCard from "../components/BookCard";
import Hero from "../components/Hero";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onCartOpen?: () => void;
  onViewBook: (book: Book) => void;
}

export default function HomePage({ onNavigate, onViewBook }: HomePageProps) {
  const { t, isAr } = useLang();

  const featured = books.filter((b) => b.badge).slice(0, 4);
  const newArrivals = books.filter((b) => b.badge === "New" || b.badgeAr === "جديد").slice(0, 4);
  const topRated = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div style={{ fontFamily: "Cairo, sans-serif" }}>
      <Hero onShopNow={() => onNavigate("books")} />

      {/* Features strip */}
      <div className="bg-amber-50 border-y border-amber-100 py-5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🚚", ar: "توصيل سريع", en: "Fast Delivery", subAr: "2-5 أيام لجميع محافظات مصر", subEn: "2-5 days across all Egypt" },
            { icon: "💬", ar: "دعم واتساب", en: "WhatsApp Support", subAr: "24/7 في خدمتك", subEn: "24/7 at your service" },
            { icon: "🔄", ar: "استبدال مجاني", en: "Free Returns", subAr: "خلال 7 أيام من الاستلام", subEn: "Within 7 days of receipt" },
            { icon: "💎", ar: "ضمان الجودة", en: "Quality Guarantee", subAr: "كتب أصلية 100%", subEn: "100% original books" },
          ].map((f) => (
            <div key={f.icon} className={`flex items-center gap-3 ${isAr ? "flex-row" : ""}`}>
              <div className="text-3xl shrink-0">{f.icon}</div>
              <div className={isAr ? "text-right" : "text-left"}>
                <div className="font-bold text-gray-700 text-sm">{isAr ? f.ar : f.en}</div>
                <div className="text-gray-400 text-xs">{isAr ? f.subAr : f.subEn}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category tiles */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className={`flex items-center justify-between mb-6 ${isAr ? "flex-row-reverse" : ""}`}>
          <h2 className="text-2xl font-black text-gray-800">
            {t("تصفح حسب التصنيف", "Browse by Category")}
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {[
            { icon: "📖", ar: "روايات", en: "Novels", color: "from-rose-400 to-pink-500" },
            { icon: "💡", ar: "تطوير الذات", en: "Self Help", color: "from-blue-400 to-indigo-500" },
            { icon: "👶", ar: "أطفال", en: "Children", color: "from-green-400 to-emerald-500" },
            { icon: "🏛️", ar: "تاريخ", en: "History", color: "from-orange-400 to-amber-500" },
            { icon: "🔬", ar: "علوم", en: "Science", color: "from-purple-400 to-violet-500" },
            { icon: "☪️", ar: "دين", en: "Religion", color: "from-teal-400 to-cyan-500" },
            { icon: "✍️", ar: "شعر", en: "Poetry", color: "from-yellow-400 to-orange-400" },
            { icon: "📚", ar: "الكل", en: "All", color: "from-gray-500 to-gray-600" },
          ].map((cat) => (
            <button
              key={cat.en}
              onClick={() => onNavigate("books")}
              className={`bg-gradient-to-br ${cat.color} text-white rounded-2xl p-3 flex flex-col items-center gap-1.5 hover:scale-105 transition-all shadow-md hover:shadow-lg aspect-square justify-center`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-bold text-center leading-tight">{isAr ? cat.ar : cat.en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Books */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className={`flex items-center justify-between mb-6 ${isAr ? "flex-row-reverse" : ""}`}>
          <h2 className="text-2xl font-black text-gray-800">⭐ {t("الكتب المميزة", "Featured Books")}</h2>
          <button onClick={() => onNavigate("books")} className="text-amber-600 hover:text-amber-700 font-semibold text-sm hover:underline">
            {t("عرض الكل ←", "View All →")}
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} onViewDetails={onViewBook} />
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="bg-amber-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`flex items-center justify-between mb-6 ${isAr ? "flex-row-reverse" : ""}`}>
            <h2 className="text-2xl font-black text-gray-800">🆕 {t("وصل حديثاً", "New Arrivals")}</h2>
            <button onClick={() => onNavigate("books")} className="text-amber-600 hover:text-amber-700 font-semibold text-sm hover:underline">
              {t("عرض الكل ←", "View All →")}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {newArrivals.map((book) => (
              <BookCard key={book.id} book={book} onViewDetails={onViewBook} />
            ))}
          </div>
        </div>
      </div>

      {/* Top Rated */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className={`flex items-center justify-between mb-6 ${isAr ? "flex-row-reverse" : ""}`}>
          <h2 className="text-2xl font-black text-gray-800">🏆 {t("الأعلى تقييماً", "Top Rated")}</h2>
          <button onClick={() => onNavigate("books")} className="text-amber-600 hover:text-amber-700 font-semibold text-sm hover:underline">
            {t("عرض الكل ←", "View All →")}
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {topRated.map((book) => (
            <BookCard key={book.id} book={book} onViewDetails={onViewBook} />
          ))}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-5">
          <div className="text-6xl">💬</div>
          <h2 className="text-3xl font-black">{t("محتاج مساعدة في اختيار كتاب؟", "Need help choosing a book?")}</h2>
          <p className="text-green-100 text-lg">
            {t(
              "فريقنا جاهز لمساعدتك على مدار الساعة عبر واتساب — اسأل عن أي كتاب، واطلب مقترحاً، أو تابع طلبك!",
              "Our team is ready to help you 24/7 via WhatsApp — ask about any book, request recommendations, or track your order!"
            )}
          </p>
          <a
            href="https://wa.me/201091106322"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-700 font-black text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-white/30 hover:scale-105 transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-green-500">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("ابدأ محادثة الآن", "Start a Chat Now")}
          </a>
          <p className="text-green-200 text-sm">+20 109 110 6322</p>
        </div>
      </div>
    </div>
  );
}
