import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. 한국어와 영어 번역 데이터 (임시로 마이페이지 텍스트만 넣었습니다)
const resources = {
  ko: {
    translation: {
      language_region: "언어 및 지역",
      language: "언어",
      korean: "한국어",
      english: "English",
      lang_helper: "앱에서 사용할 언어를 선택해주세요.",
      region: "지역",
      timezone: "시간대",
      date_format: "날짜 형식",
      save: "저장"
    }
  },
  en: {
    translation: {
      language_region: "Language & Region",
      language: "Language",
      korean: "Korean",
      english: "English",
      lang_helper: "Please select the language to use in the app.",
      region: "Region",
      timezone: "Timezone",
      date_format: "Date Format",
      save: "Save"
    }
  }
};

// 2. 사용자가 이전에 저장한 언어 설정이 있는지 확인하는 로직
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      if (savedLanguage) {
        return callback(savedLanguage);
      }
      return callback('ko'); // 기본값은 한국어
    } catch (error) {
      return callback('ko');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem('userLanguage', language);
    } catch (error) {}
  }
};

// 3. i18n 초기화
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko', // 에러 시 기본 언어
    interpolation: {
      escapeValue: false // React는 자체적으로 XSS를 방지하므로 false
    }
  });

export default i18n;