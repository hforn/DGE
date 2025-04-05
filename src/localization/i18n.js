import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./translations/en.json";
import es from "./translations/es.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: Localization.locale.split("-")[0], // e.g., 'en', 'es'
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  interpolation: {
    escapeValue: false, // not needed for React
  },
});

export default i18n;
