import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { bg, en } from "./translations";

const resources = {
    bg: {
        translation: bg,
    }, 

    en: {
        translation: en,
    }, 
}

i18next.use(initReactI18next).init({
    debug: true,
    lng: 'bg',
    compatibilityJSON: 'v3',
    fallbackLng: 'bg',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
});

export default i18next;