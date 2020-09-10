import { reduxStore } from '../App';
import { TranslationCards } from './translations/cards';
import { TranslationText, TranslationTextKey } from './translations/simpleText';
import { Translations } from '../constants';

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
export const TranslationsConfig: { [key in Translations]: { name: string; flag: string } } = {
  [Translations.en]: { name: 'English', flag: '🇺🇸' },
  [Translations.lt]: { name: 'Lithuanian', flag: '🇱🇹' },
  [Translations.it]: { name: 'Italian', flag: '🇮🇹' },
  [Translations.ptPT]: { name: 'Portugese - Portugal', flag: '🇵🇹' },
  // [Translations.es]: { name: 'Español', flag: '🇺🇸' },
};
