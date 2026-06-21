import { useState, useMemo } from "react";
import { books, categories } from "../data/books";
import { Book } from "../data/books";
import { useLang } from "../context/LanguageContext";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

interface BooksPageProps {
  searchQuery: string;
  onCartOpen: () => void;
}

export default function BooksPage({ searchQuery, onCartOpen }: BooksPageProps) {
  const { t, isAr } = useLang();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLang, setSelectedLang] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filtered = useMemo(() => {
    let result = [...books];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.titleAr.toLowerCase().includes(q) ||
          b.titleEn.toLowerCase().includes(q) ||
          b.authorAr.toLowerCase().includes(q) ||
          b.authorEn.toLowerCase().includes(q) ||
          b.categoryAr.includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== "all") {
      result = result.filter((b) => b.category === selectedCategory);
    }

    // Language
    if (selectedLang !== "all") {
      result = result.filter(
        (b) => b.language === selectedLang || b.language === "both"
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "popular": result.sort((a, b) => b.reviews - a.reviews); break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLang, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" style={{ fontFamily: "Cairo, sans-serif" }}>
      {/* Page title */}
      <div className={`mb-6 ${isAr ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl font-black text-gray-800">
          {searchQuery
            ? t(`نتائج البحث: "${searchQuery}"`, `Search results: "${searchQuery}"`)
            : t("مكتبتنا 📚", "Our Library 📚")}
        </h1>
        <p className="text-gray-500 mt-1">{filtered.length} {t("كتاب متاح", "books available")}</p>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar filters */}
        <div className="lg:w-56 shrink-0 space-y-5">
          {/* Categories */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-50">
            <h3 className={`font-bold text-gray-700 mb-3 ${isAr ? "text-right" : "text-left"}`}>{t("التصنيفات", "Categories")}</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-sm py-2 px-3 rounded-xl transition-all font-semibold ${isAr ? "text-right" : "text-left"} ${
                    selectedCategory === cat.id
                      ? "bg-amber-600 text-white"
                      : "text-gray-600 hover:bg-amber-50"
                  }`}
                >
                  {isAr ? cat.ar : cat.en}
                </button>
              ))}
            </div>
          </div>

          {/* Language filter */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-50">
            <h3 className={`font-bold text-gray-700 mb-3 ${isAr ? "text-right" : "text-left"}`}>{t("اللغة", "Language")}</h3>
            <div className="space-y-1">
              {[
                { id: "all", ar: "الكل", en: "All" },
                { id: "ar", ar: "🇪🇬 عربية فقط", en: "🇪🇬 Arabic Only" },
                { id: "en", ar: "🇬🇧 إنجليزية فقط", en: "🇬🇧 English Only" },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLang(l.id)}
                  className={`w-full text-sm py-2 px-3 rounded-xl transition-all font-semibold ${isAr ? "text-right" : "text-left"} ${
                    selectedLang === l.id
                      ? "bg-amber-600 text-white"
                      : "text-gray-600 hover:bg-amber-50"
                  }`}
                >
                  {isAr ? l.ar : l.en}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className={`flex items-center gap-3 mb-5 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
            <label className="text-sm font-semibold text-gray-600">{t("ترتيب حسب:", "Sort by:")}</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-white outline-none focus:border-amber-400"
            >
              <option value="default">{t("الافتراضي", "Default")}</option>
              <option value="price-asc">{t("السعر: من الأقل", "Price: Low to High")}</option>
              <option value="price-desc">{t("السعر: من الأعلى", "Price: High to Low")}</option>
              <option value="rating">{t("الأعلى تقييماً", "Highest Rated")}</option>
              <option value="popular">{t("الأكثر شعبية", "Most Popular")}</option>
            </select>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <div className="text-6xl">😔</div>
              <h3 className="text-xl font-bold text-gray-500">{t("لا توجد كتب مطابقة", "No books found")}</h3>
              <p className="text-gray-400 text-sm">{t("جرب تغيير فلاتر البحث", "Try changing your filters")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} onViewDetails={setSelectedBook} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Book Modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onCartOpen={onCartOpen}
        />
      )}
    </div>
  );
}
