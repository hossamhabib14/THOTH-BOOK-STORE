import { useState } from "react";
import { Book } from "../data/books";
import { useLang } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

interface BookModalProps {
  book: Book;
  onClose: () => void;
  onCartOpen: () => void;
}

export default function BookModal({ book, onClose, onCartOpen }: BookModalProps) {
  const { t, isAr } = useLang();
  const { addToCart, items } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const inCart = items.find((i) => i.book.id === book.id);
  const discount = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) addToCart(book);
    onClose();
    onCartOpen();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-t-3xl p-8 flex items-center gap-6">
          <div className="text-8xl select-none">{book.cover}</div>
          <div className={`flex-1 ${isAr ? "text-right" : "text-left"}`}>
            <div className="flex items-center gap-2 flex-wrap justify-end mb-1">
              {discount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-{discount}%</span>
              )}
              {book.badge && (
                <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {isAr ? book.badgeAr : book.badge}
                </span>
              )}
              <span className="bg-white/80 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-200">
                {book.language === "ar" ? "🇪🇬 عربي" : book.language === "en" ? "🇬🇧 English" : "🌍 ع / EN"}
              </span>
            </div>
            <h2 className="text-2xl font-black text-gray-800 leading-snug">
              {isAr ? book.titleAr : book.titleEn}
            </h2>
            <p className="text-amber-600 font-semibold">{isAr ? book.authorAr : book.authorEn}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-400">{"★".repeat(Math.round(book.rating))}</span>
              <span className="text-xs text-gray-400">{book.rating} ({book.reviews.toLocaleString()} {t("تقييم", "reviews")})</span>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">✕</button>
        </div>

        {/* Body */}
        <div className={`p-6 space-y-5 ${isAr ? "text-right" : "text-left"}`}>
          {/* Description */}
          <div>
            <h3 className="font-bold text-gray-700 mb-2 text-base">📝 {t("وصف الكتاب", "Book Description")}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isAr ? book.descriptionAr : book.descriptionEn}
            </p>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: t("التصنيف", "Category"), value: isAr ? book.categoryAr : book.category },
              { label: t("اللغة", "Language"), value: book.language === "ar" ? "عربي" : book.language === "en" ? "English" : "عربي / English" },
              { label: t("المخزون", "Stock"), value: `${book.stock} ${t("نسخة", "copies")}` },
              { label: t("التقييم", "Rating"), value: `${book.rating} / 5` },
            ].map((d) => (
              <div key={d.label} className="bg-amber-50 rounded-xl p-3">
                <div className="text-xs text-amber-600 font-semibold mb-0.5">{d.label}</div>
                <div className="text-sm font-bold text-gray-700">{d.value}</div>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-100">
            <div className={`flex items-center justify-between flex-wrap gap-3`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-amber-700">{book.price * qty} {t("ج.م", "EGP")}</span>
                  {book.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">{book.originalPrice * qty} {t("ج.م", "EGP")}</span>
                  )}
                </div>
                {book.originalPrice && (
                  <div className="text-green-600 text-sm font-semibold">
                    {t(`وفرت ${(book.originalPrice - book.price) * qty} ج.م`, `You save ${(book.originalPrice - book.price) * qty} EGP`)}
                  </div>
                )}
              </div>
              {/* Quantity */}
              <div className="flex items-center gap-2 bg-white rounded-xl border border-amber-200 p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg bg-amber-100 hover:bg-amber-200 font-bold text-amber-700 flex items-center justify-center">-</button>
                <span className="w-8 text-center font-bold text-gray-700">{qty}</span>
                <button onClick={() => setQty(Math.min(book.stock, qty + 1))} className="w-8 h-8 rounded-lg bg-amber-100 hover:bg-amber-200 font-bold text-amber-700 flex items-center justify-center">+</button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className={`flex-1 py-3 rounded-xl font-bold text-base transition-all ${
                added ? "bg-green-500 text-white" : "bg-amber-100 hover:bg-amber-200 text-amber-700 border border-amber-300"
              }`}
            >
              {added ? t("✓ أضيف للسلة!", "✓ Added to Cart!") : t("🛒 أضف للسلة", "🛒 Add to Cart")}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3 rounded-xl font-bold text-base bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-amber-300 transition-all"
            >
              {t("اشتري الآن ⚡", "Buy Now ⚡")}
            </button>
          </div>

          {inCart && (
            <p className="text-center text-sm text-amber-600 font-semibold">
              ✓ {t(`هذا الكتاب في سلتك (${inCart.quantity} نسخة)`, `This book is in your cart (${inCart.quantity} copy)`)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
