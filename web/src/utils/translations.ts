import { reduxStore } from '../App';
import { TranslationCards } from './translations/cards';
import { TranslationText, TranslationTextKey } from './translations/simpleText';
import { Translations } from '../constants';
import { FlagName } from 'components/Flag/all';
import { exists, isArray } from './index';

export function getTranslation(type: TranslationTextKey) {
  // Look up translation
  const translation: Translations = reduxStore.getState().auth?.lang || Translations.en;
  let translateText = TranslationText[translation][type] || '';
  if (!translateText) {
    console.log('Translation text does not exist for - ', type);
    if (translation !== Translations.en && TranslationText[Translations.en][type]) {
      translateText = TranslationText[Translations.en][type];
    }
  }
  return translateText;
}
export function getTranslationFront(cardId: string) {
  // Look up translation
  const translation: Translations = reduxStore.getState().auth?.lang || Translations.en;
  return TranslationCards[cardId].frontText[translation];
}
export function getTranslationBack(cardId: string) {
  // Look up translation
  const translation: Translations = reduxStore.getState().auth?.lang || Translations.en;
  return TranslationCards[cardId].backText[translation];
}
export const TranslationsConfig: { [key in Translations]: { name: string; flag: FlagName; folder?: string } } = {
  [Translations.en]: { name: 'English', flag: 'us', folder: 'en' },
  [Translations.lt]: { name: 'Lietuvis', flag: 'lithuania', folder: '' },
  [Translations.it]: { name: 'Italiano', flag: 'italy', folder: 'it' },
  [Translations.ptPT]: { name: 'Português - Portugus', flag: 'portugal', folder: 'pt-pt' },
  [Translations.ptBR]: { name: 'Português - Brasil', flag: 'brazil', folder: 'pt-br' },
  [Translations.es]: { name: 'Español', flag: 'spain', folder: 'es' },
  [Translations.zhCN]: { name: '繁體中文', flag: 'china-hk', folder: 'zh-cn' },
  [Translations.ar]: { name: 'عربى', flag: 'saudi-arabia', folder: 'ar' },
  [Translations.fr]: { name: 'Français', flag: 'france', folder: 'fr' },
};

export function getUserLocaleWithConfig(): Translations {
  const browserLocales = navigator.languages === undefined ? [navigator.language] : navigator.languages;
  if (!browserLocales) {
    return Translations.en;
  }
  const locales = browserLocales
    .filter(Boolean)
    .map((locale: string) => (locale || '').trim())
    .map((l) => ({
      lang: l,
      code: (l.split(/-|_/)[0] || '').toLowerCase(),
    }));
  const mapping: { [key in string]: Translations | Translations[] } = {
    en: Translations.en,
    lt: Translations.lt,
    it: Translations.it,
    pt: [Translations.ptPT, Translations.ptBR],
    zh: [Translations.zhCN],
    es: Translations.es,
    ar: Translations.ar,
    fr: Translations.fr,
  };

  let maybeResult: Translations | undefined;

  for (let i = 0; i < locales.length; i++) {
    const { lang, code } = locales[i];
    const val = mapping[code];
    if (val) {
      if (isArray(val)) {
        // Check if it matches exactly with an element in the array, then use that, or possibly set it to the first value
        let matching = val.find((t: Translations) => t === code || t === lang);
        if (matching) {
          return matching;
        } else {
          if (!maybeResult) {
            maybeResult = val[0];
          }
        }
      } else {
        // If it matches a mapping, return that value
        return val;
      }
    }
  }

  if (maybeResult) {
    return maybeResult;
  }

  return Translations.en;
}
