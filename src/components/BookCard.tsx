import { useState } from "react";
import { Book } from "../data/books";
import { useLang } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
}

export default function BookCard({ book, onViewDetails }: BookCardProps) {
  const { t, isAr } = useLang();
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);

  const inCart = items.find((i) => i.book.id === book.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden border border-amber-50 group flex flex-col"
      onClick={() => onViewDetails(book)}
    >
      {/* Cover */}
      <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center h-48 overflow-hidden">
        <span className="text-7xl group-hover:scale-110 transition-transform duration-300 select-none">
          {book.cover}
        </span>
        {/* Language badge */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur rounded-full px-2 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
          {book.language === "ar" ? "🇪🇬 عربي" : book.language === "en" ? "🇬🇧 English" : "🌍 ع / EN"}
        </div>
        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </div>
        )}
        {/* Custom badge */}
        {book.badge && !discount && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {isAr ? book.badgeAr : book.badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1" style={{ fontFamily: "Cairo, sans-serif", textAlign: isAr ? "right" : "left" }}>
        <h3 className="font-bold text-gray-800 text-base leading-snug mb-0.5 line-clamp-1">
          {isAr ? book.titleAr : book.titleEn}
        </h3>
        <p className="text-amber-600 text-sm font-medium mb-1 line-clamp-1">
          {isAr ? book.authorAr : book.authorEn}
        </p>
        <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5 self-start mb-2">
          {isAr ? book.categoryAr : book.category}
        </span>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400 text-sm">{"★".repeat(Math.round(book.rating))}</span>
          <span className="text-xs text-gray-400">({book.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xl font-black text-amber-700">{book.price} {t("ج.م", "EGP")}</span>
          {book.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{book.originalPrice} {t("ج.م", "EGP")}</span>
          )}
        </div>

        {/* Stock */}
        <p className={`text-xs mb-3 ${book.stock <= 5 ? "text-red-500 font-semibold" : "text-green-600"}`}>
          {book.stock <= 5
            ? t(`متبقي ${book.stock} فقط!`, `Only ${book.stock} left!`)
            : t("متوفر في المخزن ✓", "In Stock ✓")}
        </p>

        <div className="mt-auto flex gap-2">
          <button
            onClick={handleAdd}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              added
                ? "bg-green-500 text-white scale-95"
                : inCart
                ? "bg-amber-100 text-amber-700 border border-amber-300"
                : "bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-amber-200"
            }`}
          >
            {added ? t("✓ أضيف!", "✓ Added!") : inCart ? t(`في السلة (${inCart.quantity})`, `In Cart (${inCart.quantity})`) : t("أضف للسلة 🛒", "Add to Cart 🛒")}
          </button>
        </div>
      </div>
    </div>
  );
}
