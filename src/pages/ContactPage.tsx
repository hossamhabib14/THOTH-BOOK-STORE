import { useState } from "react";
import { useLang } from "../context/LanguageContext";

export default function ContactPage() {
  const { t, isAr } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = isAr
      ? `مرحباً مكتبة النور 📚\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\n\n${form.message}`
      : `Hello Nour Bookstore 📚\n\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`;
    window.open(`https://wa.me/201091106322?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10" style={{ fontFamily: "Cairo, sans-serif" }}>
      <div className="text-center">
        <div className="text-7xl mb-4">📞</div>
        <h1 className="text-4xl font-black text-amber-800 mb-2">{t("تواصل معنا", "Contact Us")}</h1>
        <p className="text-gray-500">{t("نحن هنا لمساعدتك في كل وقت!", "We're here to help you anytime!")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="space-y-4">
          {[
            {
              icon: "💬",
              title: t("واتساب", "WhatsApp"),
              value: "+20 109 110 6322",
              link: "https://wa.me/201091106322",
              color: "bg-green-50 border-green-200",
              btn: t("تواصل الآن", "Chat Now"),
              btnColor: "bg-green-500 hover:bg-green-600"
            },
            {
              icon: "📱",
              title: t("هاتف", "Phone"),
              value: "01091106322",
              link: "tel:+201091106322",
              color: "bg-blue-50 border-blue-200",
              btn: t("اتصل الآن", "Call Now"),
              btnColor: "bg-blue-500 hover:bg-blue-600"
            },
            {
              icon: "🕐",
              title: t("أوقات الدوام", "Working Hours"),
              value: t("السبت - الخميس: 9ص - 10م", "Sat - Thu: 9AM - 10PM"),
              link: null,
              color: "bg-amber-50 border-amber-200",
              btn: null,
              btnColor: ""
            },
            {
              icon: "🚚",
              title: t("التوصيل", "Delivery"),
              value: t("جميع محافظات مصر 2-5 أيام", "All Egyptian governorates 2-5 days"),
              link: null,
              color: "bg-purple-50 border-purple-200",
              btn: null,
              btnColor: ""
            },
          ].map((item) => (
            <div key={item.title} className={`${item.color} border rounded-2xl p-4 flex items-center gap-4 ${isAr ? "flex-row" : ""}`}>
              <div className="text-4xl shrink-0">{item.icon}</div>
              <div className={`flex-1 ${isAr ? "text-right" : "text-left"}`}>
                <div className="font-bold text-gray-700 text-sm">{item.title}</div>
                <div className="text-gray-600 font-semibold">{item.value}</div>
              </div>
              {item.link && item.btn && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${item.btnColor} text-white text-xs font-bold px-3 py-2 rounded-xl shrink-0 transition-colors`}
                >
                  {item.btn}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="bg-white rounded-2xl shadow-md border border-amber-50 p-6">
          <h2 className={`text-xl font-black text-gray-800 mb-5 ${isAr ? "text-right" : "text-left"}`}>
            {t("أرسل رسالة", "Send a Message")}
          </h2>
          <form onSubmit={handleSend} className="space-y-4">
            {[
              { key: "name", label: t("الاسم", "Name"), placeholder: t("اسمك الكريم", "Your name"), type: "text" },
              { key: "phone", label: t("الهاتف", "Phone"), placeholder: "01XXXXXXXXX", type: "tel" },
            ].map((f) => (
              <div key={f.key} className={isAr ? "text-right" : "text-left"}>
                <label className="block text-sm font-bold text-gray-700 mb-1">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>
            ))}
            <div className={isAr ? "text-right" : "text-left"}>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t("الرسالة", "Message")}</label>
              <textarea
                placeholder={t("كيف يمكننا مساعدتك؟", "How can we help you?")}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {sent ? t("✓ تم الإرسال!", "✓ Sent!") : t("إرسال عبر واتساب", "Send via WhatsApp")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
