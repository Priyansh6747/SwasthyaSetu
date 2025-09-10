import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

// Import translations
import enUS from "./locales/en-US/translations.json";
import hiIN from "./locales/hi-IN/translations.json";
import paIN from "./locales/pa-IN/translations.json";

// Map translations
const resources = {
    "en-US": { translation: enUS },
    "hi-IN": { translation: hiIN },
    "pa-IN": { translation: paIN }
};

// Key for storing user language
const LANGUAGE_KEY = "selectedLanguage";

// Helper: check if language is RTL
const isRTL = (lng) => ["ar", "he", "fa", "ur"].some(code => lng.startsWith(code));

// Init function
export const initI18n = async () => {
    try {
        // Try AsyncStorage first
        let storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);

        // Else, fall back to device language
        if (!storedLang) {
            const deviceLocale = Localization.getLocales()[0]?.languageTag || "en-US";
            storedLang = Object.keys(resources).includes(deviceLocale) ? deviceLocale : "en-US";
        }

        // Handle RTL if needed
        if (isRTL(storedLang) !== I18nManager.isRTL) {
            I18nManager.forceRTL(isRTL(storedLang));
        }

        // Init i18n
        await i18n.use(initReactI18next).init({
            resources,
            lng: storedLang,
            fallbackLng: "en-US",
            compatibilityJSON: "v3",
            interpolation: { escapeValue: false }
        });
    } catch (err) {
        console.error("i18n init error:", err);
        await i18n.use(initReactI18next).init({
            resources,
            lng: "en-US",
            fallbackLng: "en-US",
            interpolation: { escapeValue: false }
        });
    }
};

// Change language + persist
export const changeLanguage = async (lng) => {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem(LANGUAGE_KEY, lng);

    if (isRTL(lng) !== I18nManager.isRTL) {
        I18nManager.forceRTL(isRTL(lng));
    }
};

export default i18n;
