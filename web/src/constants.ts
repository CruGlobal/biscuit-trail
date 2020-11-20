import { Card } from 'utils/types';

export const Configs = {
  ShareUrlBase: `https://thebiscuittrail.com/`,
  YoutubeUrl: `https://www.youtube.com/watch?v=G317LXupvEQ`,
};

export const BOARD_SIZE = 12;
export const REDUX_ACTIONS = {
  REQUEST_FETCH: 'REQUEST_FETCH',
  REQUEST_FAIL: 'REQUEST_FAIL',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  UPDATE_ROOM: 'UPDATE_ROOM',
  SET_NAME: 'SET_NAME',
  SET_CODE: 'SET_CODE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  MODAL_OPEN: 'MODAL_OPEN',
  MODAL_CLOSE: 'MODAL_CLOSE',
  CARD_MODAL_OPEN: 'CARD_MODAL_OPEN',
  CARD_MODAL_CLOSE: 'CARD_MODAL_CLOSE',
  CHANGE_ROUND: 'CHANGE_ROUND',
  SET_LANG: 'SET_LANG',
  SET_LANG_AUTO: 'SET_LANG_AUTO',
};

function generateRandomTopPosition() {
  const isPortrait = window.innerWidth <= 1024;
  const offset = isPortrait ? window.innerHeight / 2 - window.innerHeight * 0.25 : window.innerHeight - 250;
  return Math.random() * offset;
}

function generateRandomLeftPosition() {
  const isPortrait = window.innerWidth <= 1024;
  const offset = isPortrait ? window.innerWidth * 0.6 : window.innerWidth * 0.3;
  return Math.random() * offset;
}

/**
 * When adding a new translation:
 * - Add it here
 * - Change the `TranslationsConfig` in utils/translations.ts
 * - Change the `getUserLocaleWithConfig` mapping in utils/translations.ts
 * - Add the new translation values in utils/translations/simpleText.ts
 * - Add the new translation values in utils/translations/cards.ts
 */
export enum Translations {
  en = 'en',
  es = 'es',
  lt = 'lt',
  it = 'it',
  ptPT = 'pt-PT',
  ptBR = 'pt-BR',
  zhCN = 'zh-CN',
  ar = 'ar',
}
export const CARDS: { [key in string]: Card } = {
  card1: {
    id: 'card1',
    backgroundColor: '#0866b3',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card2: {
    id: 'card2',
    backgroundColor: '#019e46',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card3: {
    id: 'card3',
    backgroundColor: '#d21075',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card4: {
    id: 'card4',
    backgroundColor: '#1bd3d2',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card5: {
    id: 'card5',
    backgroundColor: '#0f1f67',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card6: {
    id: 'card6',
    backgroundColor: '#ffcd01',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card7: {
    id: 'card7',
    backgroundColor: '#ea1447',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card8: {
    id: 'card8',
    backgroundColor: '#028443',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card9: {
    id: 'card9',
    backgroundColor: '#ef591f',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card10: {
    id: 'card10',
    backgroundColor: '#81be36',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card11: {
    id: 'card11',
    backgroundColor: '#ad1b36',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
  card12: {
    id: 'card12',
    backgroundColor: '#842175',
    defaultPosition: {
      top: generateRandomTopPosition(),
      left: generateRandomLeftPosition(),
    },
  },
};
