import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  onCartOpen: () => void;
  onSearch: (q: string) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ onCartOpen, onSearch, currentPage, onNavigate }: NavbarProps) {
  const { lang, setLang, t, isAr } = useLang();
  const { totalItems } = useCart();
  const [searchVal, setSearchVal] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-amber-100">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white text-xs py-1.5 text-center tracking-wide">
        <span>📚 {t("مرحباً بكم في مكتبة النور | شحن سريع لجميع أنحاء مصر", "Welcome to Nour Bookstore | Fast delivery across Egypt")} 📚</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 shrink-0 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-xl">📚</span>
          </div>
          <div className={isAr ? "text-right" : "text-left"}>
            <div className="text-lg font-bold text-amber-800 leading-tight" style={{ fontFamily: isAr ? "Cairo, sans-serif" : "Playfair Display, serif" }}>
              {t("مكتبة النور", "Nour Bookstore")}
            </div>
            <div className="text-[10px] text-amber-500 font-medium leading-tight">
              {t("Nour Bookstore", "مكتبة النور")}
            </div>
          </div>
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex">
          <div className="relative w-full">
            <input
              value={searchVal}
              onChange={(e) => { setSearchVal(e.target.value); onSearch(e.target.value); }}
              placeholder={t("ابحث عن كتاب...", "Search for a book...")}
              className="w-full border border-amber-200 rounded-full px-5 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50 pr-10"
              style={{ fontFamily: "Cairo, sans-serif" }}
            />
            <button type="submit" className="absolute top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-700"
              style={{ [isAr ? "left" : "right"]: "12px" }}>
              🔍
            </button>
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="hidden sm:flex items-center gap-1 text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-full transition-colors"
          >
            <span>{lang === "ar" ? "EN" : "ع"}</span>
          </button>

          {/* Cart */}
          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-amber-300 hover:scale-105"
          >
            <span className="text-base">🛒</span>
            <span className="hidden sm:inline">{t("السلة", "Cart")}</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-amber-700 text-xl"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile search & menu */}
      {mobileOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-100 px-4 py-3 space-y-2">
          <form onSubmit={handleSearch} className="flex">
            <input
              value={searchVal}
              onChange={(e) => { setSearchVal(e.target.value); onSearch(e.target.value); }}
              placeholder={t("ابحث عن كتاب...", "Search for a book...")}
              className="flex-1 border border-amber-200 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              style={{ fontFamily: "Cairo, sans-serif" }}
            />
          </form>
          <button
            onClick={() => { setLang(lang === "ar" ? "en" : "ar"); setMobileOpen(false); }}
            className="w-full text-center text-sm font-bold bg-amber-100 text-amber-800 py-2 rounded-full"
          >
            {lang === "ar" ? "Switch to English" : "التبديل للعربية"}
          </button>
        </div>
      )}

      {/* Nav links */}
      <div className="hidden md:flex border-t border-amber-50 bg-amber-50/60 px-4 max-w-7xl mx-auto gap-6 py-1.5">
        {[
          { key: "home", ar: "الرئيسية", en: "Home" },
          { key: "books", ar: "الكتب", en: "All Books" },
          { key: "about", ar: "من نحن", en: "About Us" },
          { key: "contact", ar: "تواصل معنا", en: "Contact" },
        ].map((link) => (
          <button
            key={link.key}
            onClick={() => onNavigate(link.key)}
            className={`text-sm font-semibold py-1 border-b-2 transition-colors ${
              currentPage === link.key
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-gray-500 hover:text-amber-700"
            }`}
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            {isAr ? link.ar : link.en}
          </button>
        ))}
      </div>
    </nav>
  );
}
