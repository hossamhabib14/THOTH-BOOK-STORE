import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

interface CheckoutModalProps {
  onClose: () => void;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { t, isAr } = useLang();
  const { items, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    paymentMethod: "cash",
  });
  const [step, setStep] = useState<"form" | "confirm" | "done">("form");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cities = [
    "القاهرة", "الجيزة", "الإسكندرية", "الأقصر", "أسوان", "المنيا", "سوهاج",
    "أسيوط", "قنا", "الغربية", "المنوفية", "الدقهلية", "الشرقية",
    "الإسماعيلية", "السويس", "بورسعيد", "دمياط", "كفر الشيخ", "البحيرة",
    "شمال سيناء", "جنوب سيناء", "مطروح", "الوادي الجديد", "بني سويف", "الفيوم",
  ];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t("الاسم مطلوب", "Name is required");
    if (!form.phone.trim() || !/^01[0-9]{9}$/.test(form.phone.trim()))
      e.phone = t("رقم هاتف مصري صحيح مطلوب (01XXXXXXXXX)", "Valid Egyptian phone required (01XXXXXXXXX)");
    if (!form.address.trim()) e.address = t("العنوان مطلوب", "Address is required");
    if (!form.city) e.city = t("اختر المحافظة", "Select your city");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setStep("confirm");
  };

  const buildWhatsAppMessage = () => {
    const orderLines = items
      .map(
        (item) =>
          `• ${isAr ? item.book.titleAr : item.book.titleEn} × ${item.quantity} = ${item.book.price * item.quantity} ${t("ج.م", "EGP")}`
      )
      .join("\n");

    const paymentLabel =
      form.paymentMethod === "cash"
        ? t("دفع عند الاستلام", "Cash on Delivery")
        : form.paymentMethod === "instapay"
        ? "InstaPay"
        : t("تحويل بنكي", "Bank Transfer");

    const msg = isAr
      ? `🛒 *طلب جديد من مكتبة النور*\n\n` +
        `👤 *الاسم:* ${form.name}\n` +
        `📱 *الهاتف:* ${form.phone}\n` +
        `📍 *العنوان:* ${form.address}، ${form.city}\n\n` +
        `📚 *الكتب المطلوبة:*\n${orderLines}\n\n` +
        `💰 *الإجمالي:* ${totalPrice} ج.م\n` +
        `💳 *طريقة الدفع:* ${paymentLabel}\n` +
        (form.notes ? `📝 *ملاحظات:* ${form.notes}\n` : "") +
        `\nشكراً لتسوقك معنا! سنتواصل معك قريباً لتأكيد الطلب ✨`
      : `🛒 *New Order - Nour Bookstore*\n\n` +
        `👤 *Name:* ${form.name}\n` +
        `📱 *Phone:* ${form.phone}\n` +
        `📍 *Address:* ${form.address}, ${form.city}\n\n` +
        `📚 *Books Ordered:*\n${orderLines}\n\n` +
        `💰 *Total:* ${totalPrice} EGP\n` +
        `💳 *Payment Method:* ${paymentLabel}\n` +
        (form.notes ? `📝 *Notes:* ${form.notes}\n` : "") +
        `\nThank you for shopping with us! We'll contact you shortly to confirm your order ✨`;

    return encodeURIComponent(msg);
  };

  const handleConfirm = () => {
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/201091106322?text=${msg}`, "_blank");
    setStep("done");
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {/* Done state */}
        {step === "done" && (
          <div className="p-12 flex flex-col items-center text-center gap-5">
            <div className="text-8xl animate-bounce">🎉</div>
            <h2 className="text-2xl font-black text-green-600">{t("تم إرسال طلبك!", "Order Sent!")}</h2>
            <p className="text-gray-500 leading-relaxed">
              {t(
                "تم فتح واتساب لإرسال طلبك. سيتواصل معك فريق مكتبة النور خلال دقائق لتأكيد الطلب والشحن. شكراً لثقتك! 📚",
                "WhatsApp has opened to send your order. Our team will contact you within minutes to confirm the order and shipping. Thank you for your trust! 📚"
              )}
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <a
                href="https://wa.me/201091106322"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("واتساب مباشر", "Direct WhatsApp")}
              </a>
              <button
                onClick={onClose}
                className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold px-6 py-3 rounded-2xl transition-all"
              >
                {t("العودة للمكتبة", "Back to Store")}
              </button>
            </div>
          </div>
        )}

        {/* Confirm state */}
        {step === "confirm" && (
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-800">✅ {t("تأكيد الطلب", "Confirm Order")}</h2>
              <button onClick={() => setStep("form")} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>

            {/* Order summary */}
            <div className="bg-amber-50 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-amber-800">{t("ملخص الطلب", "Order Summary")}</h3>
              {items.map((item) => (
                <div key={item.book.id} className={`flex justify-between items-center text-sm ${isAr ? "flex-row-reverse" : ""}`}>
                  <span className="font-semibold text-gray-700">
                    {item.book.cover} {isAr ? item.book.titleAr : item.book.titleEn} × {item.quantity}
                  </span>
                  <span className="font-bold text-amber-700">{item.book.price * item.quantity} {t("ج.م", "EGP")}</span>
                </div>
              ))}
              <div className={`border-t border-amber-200 pt-2 flex justify-between font-black text-base ${isAr ? "flex-row-reverse" : ""}`}>
                <span>{t("الإجمالي", "Total")}</span>
                <span className="text-amber-700">{totalPrice} {t("ج.م", "EGP")}</span>
              </div>
            </div>

            {/* Customer info */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-sm">
              <h3 className="font-bold text-gray-700">{t("بيانات الشحن", "Shipping Info")}</h3>
              {[
                { label: t("الاسم", "Name"), val: form.name },
                { label: t("الهاتف", "Phone"), val: form.phone },
                { label: t("العنوان", "Address"), val: `${form.address}، ${form.city}` },
                { label: t("الدفع", "Payment"), val: form.paymentMethod === "cash" ? t("دفع عند الاستلام", "Cash on Delivery") : form.paymentMethod === "instapay" ? "InstaPay" : t("تحويل بنكي", "Bank Transfer") },
              ].map((row) => (
                <div key={row.label} className={`flex gap-2 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                  <span className="text-gray-500 shrink-0">{row.label}:</span>
                  <span className="font-semibold text-gray-700">{row.val}</span>
                </div>
              ))}
              {form.notes && (
                <div className={`flex gap-2 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                  <span className="text-gray-500">{t("ملاحظات", "Notes")}:</span>
                  <span className="text-gray-700">{form.notes}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("form")}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
              >
                {t("تعديل", "Edit")}
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-black text-base shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("تأكيد وإرسال واتساب", "Confirm & Send WhatsApp")}
              </button>
            </div>
          </div>
        )}

        {/* Form state */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-800">📦 {t("بيانات الطلب", "Order Details")}</h2>
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">1</div>
                <span className="text-amber-700 font-semibold">{t("البيانات", "Details")}</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200"></div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold">2</div>
                <span>{t("التأكيد", "Confirm")}</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200"></div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold">3</div>
                <span>{t("الإرسال", "Send")}</span>
              </div>
            </div>

            {/* Mini order summary */}
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <div className={`flex justify-between items-center text-sm ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="text-gray-600">{items.length} {t("كتاب في سلتك", "books in cart")}</span>
                <span className="font-black text-amber-700 text-base">{totalPrice} {t("ج.م", "EGP")}</span>
              </div>
            </div>

            {/* Fields */}
            {[
              { key: "name", label: t("الاسم الكامل *", "Full Name *"), placeholder: t("محمد أحمد", "John Doe"), type: "text" },
              { key: "phone", label: t("رقم الهاتف *", "Phone Number *"), placeholder: "01XXXXXXXXX", type: "tel" },
              { key: "address", label: t("العنوان التفصيلي *", "Detailed Address *"), placeholder: t("الشارع، المبنى، الدور، الشقة", "Street, Building, Floor, Apartment"), type: "text" },
            ].map((field) => (
              <div key={field.key} className={isAr ? "text-right" : "text-left"}>
                <label className="block text-sm font-bold text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all ${errors[field.key] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"}`}
                />
                {errors[field.key] && <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>}
              </div>
            ))}

            {/* City */}
            <div className={isAr ? "text-right" : "text-left"}>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t("المحافظة *", "City / Governorate *")}</label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all bg-white ${errors.city ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"}`}
              >
                <option value="">{t("-- اختر المحافظة --", "-- Select City --")}</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            {/* Payment */}
            <div className={isAr ? "text-right" : "text-left"}>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("طريقة الدفع", "Payment Method")}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: "cash", icon: "💵", ar: "دفع عند الاستلام", en: "Cash on Delivery" },
                  { val: "instapay", icon: "📱", ar: "انستاباي", en: "InstaPay" },
                  { val: "bank", icon: "🏦", ar: "تحويل بنكي", en: "Bank Transfer" },
                ].map((pm) => (
                  <button
                    key={pm.val}
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: pm.val })}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                      form.paymentMethod === pm.val
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-gray-200 text-gray-500 hover:border-amber-200"
                    }`}
                  >
                    <span className="text-xl">{pm.icon}</span>
                    <span className="text-center leading-tight">{isAr ? pm.ar : pm.en}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className={isAr ? "text-right" : "text-left"}>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t("ملاحظات (اختياري)", "Notes (Optional)")}</label>
              <textarea
                placeholder={t("أي تعليمات خاصة للتوصيل...", "Any special delivery instructions...")}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-amber-300 transition-all hover:scale-[1.02]"
            >
              {t("مراجعة الطلب ←", "Review Order →")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
