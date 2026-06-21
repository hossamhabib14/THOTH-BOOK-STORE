import React, { createContext, useContext, useState } from "react";

type Lang = "ar" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (ar: string, en: string) => string;
  isAr: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "ar",
  setLang: () => {},
  t: (ar) => ar,
  isAr: true,
});

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("ar");

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };

  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const isAr = lang === "ar";

  return (
    <LangContext.Provider value={{ lang, setLang, t, isAr }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
