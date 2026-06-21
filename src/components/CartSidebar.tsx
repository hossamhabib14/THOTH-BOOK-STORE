
import { useLang } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { t, isAr } = useLang();
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${isAr ? "left-0" : "right-0"} z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-all`}
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-600 text-white p-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black">🛒 {t("سلة التسوق", "Shopping Cart")}</h2>
            <p className="text-amber-200 text-sm">{totalItems} {t("كتاب", "books")}</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white text-2xl w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="text-7xl">🛒</div>
              <h3 className="text-xl font-bold text-gray-600">{t("سلتك فارغة", "Your cart is empty")}</h3>
              <p className="text-gray-400 text-sm">{t("أضف بعض الكتب الرائعة!", "Add some amazing books!")}</p>
              <button
                onClick={onClose}
                className="bg-amber-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-amber-700 transition-colors mt-2"
              >
                {t("تصفح الكتب", "Browse Books")}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.book.id} className="bg-amber-50 rounded-2xl p-3 flex gap-3 border border-amber-100">
                <div className="text-4xl w-14 h-14 flex items-center justify-center bg-white rounded-xl shrink-0 shadow-sm">
                  {item.book.cover}
                </div>
                <div className={`flex-1 min-w-0 ${isAr ? "text-right" : "text-left"}`}>
                  <h4 className="font-bold text-gray-800 text-sm line-clamp-1">
                    {isAr ? item.book.titleAr : item.book.titleEn}
                  </h4>
                  <p className="text-amber-600 text-xs">{isAr ? item.book.authorAr : item.book.authorEn}</p>
                  <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
                    <span className="font-black text-amber-700 text-base">
                      {item.book.price * item.quantity} {t("ج.م", "EGP")}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-amber-200 hover:bg-amber-300 font-bold text-amber-800 text-sm flex items-center justify-center"
                      >-</button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-amber-200 hover:bg-amber-300 font-bold text-amber-800 text-sm flex items-center justify-center"
                      >+</button>
                      <button
                        onClick={() => removeFromCart(item.book.id)}
                        className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 text-red-500 text-sm flex items-center justify-center mr-1"
                      >🗑</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-amber-100 bg-white p-4 space-y-3">
            {/* Subtotal */}
            <div className={`flex justify-between items-center ${isAr ? "flex-row" : "flex-row-reverse"}`}>
              <span className="text-gray-500 text-sm">{t("الإجمالي", "Subtotal")}</span>
              <span className="font-black text-2xl text-amber-700">{totalPrice} {t("ج.م", "EGP")}</span>
            </div>
            <p className="text-xs text-gray-400 text-center">
              {t("رسوم الشحن تُحسب عند الطلب", "Shipping calculated at checkout")}
            </p>
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-amber-300 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("إتمام الطلب عبر واتساب", "Checkout via WhatsApp")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
