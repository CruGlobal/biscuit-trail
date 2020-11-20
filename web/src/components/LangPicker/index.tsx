import React, { useState, useRef, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useOnClickOutside } from 'utils/hooks';
import { getUserLocaleWithConfig, TranslationsConfig } from 'utils/translations';
import { REDUX_ACTIONS, Translations } from '../../constants';
import { RootState } from 'reducers';
import Flag from 'components/Flag';
import Icon from 'components/Icon';
import { logEvent } from 'utils/analytics';

export default function LangPicker({ isHost }: { isHost?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = useSelector(({ auth }: RootState) => auth.lang);
  const hasUserSetLang = useSelector(({ auth }: RootState) => auth.hasUserSetLang);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasUserSetLang) {
      const setUserLocaleValue = getUserLocaleWithConfig();
      dispatch({ type: REDUX_ACTIONS.SET_LANG_AUTO, lang: setUserLocaleValue });
      logEvent('Language.Auto.Set', { lang: setUserLocaleValue });
    }
  }, []);

  const selectedLang = TranslationsConfig[lang];

  function handleLang(newLang: Translations) {
    setIsMenuOpen(false);
    dispatch({ type: REDUX_ACTIONS.SET_LANG, lang: newLang });
    logEvent('Language.Choose.Set', { lang: newLang });
  }

  useOnClickOutside(menuRef, (event: any) => {
    setIsMenuOpen(false);
  });

  return (
    <div className="absolute top-0 left-0 p-2 sm:p-4" ref={menuRef}>
      <Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ padding: '0px 10px' }}
        className={classNames('text-white text-lg rounded', {
          'bg-blue': isMenuOpen,
          'bg-white': !isMenuOpen,
        })}
      >
        {isMenuOpen ? <Icon name="x" size={24} /> : <Flag name={selectedLang?.flag} />}
      </Button>
      <div className="relative">
        {isMenuOpen && (
          <div className="flex flex-col bg-white items-center mt-1 rounded-lg animated animate100 fadeInUp text-base px-1">
            {Object.keys(TranslationsConfig).map((key) => {
              const config = TranslationsConfig[key as Translations];
              return (
                <div
                  key={key}
                  className="p-1 hover:text-yellow-500 text-lightBlue cursor-pointer w-full flex flex-row items-center"
                  onClick={() => handleLang(key as Translations)}
                >
                  <Flag name={config.flag} className="mr-3" />
                  {config.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
