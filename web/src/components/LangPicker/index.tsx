import React, { useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useOnClickOutside } from 'utils/hooks';
import { TranslationsConfig } from 'utils/translations';
import { REDUX_ACTIONS, Translations } from '../../constants';
import { RootState } from 'reducers';

export default function LangPicker({ isHost }: { isHost?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = useSelector(({ auth }: RootState) => auth.lang);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const selectedLang = TranslationsConfig[lang];

  function handleLang(lang: Translations) {
    setIsMenuOpen(false);
    dispatch({ type: REDUX_ACTIONS.SET_LANG, lang });
  }

  useOnClickOutside(menuRef, (event: any) => {
    setIsMenuOpen(false);
  });

  return (
    <div className="absolute top-0 left-0 p-2 sm:p-4" ref={menuRef}>
      <Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        text={isMenuOpen ? '✖' : selectedLang?.flag}
        style={{ padding: '0px 10px' }}
        className={classNames('text-white text-lg rounded', {
          'bg-blue': isMenuOpen,
          'bg-white': !isMenuOpen,
        })}
      />
      <div className="relative">
        {isMenuOpen && (
          <div className="flex flex-col bg-white items-center mt-1 rounded-lg animated animate100 fadeInUp text-base px-1">
            {Object.keys(TranslationsConfig).map((key) => {
              const config = TranslationsConfig[key as Translations];
              return (
                <div
                  key={key}
                  className="p-1 hover:text-yellow-500 text-lightBlue cursor-pointer inline w-full"
                  onClick={() => handleLang(key as Translations)}
                >
                  <span className="mr-3">{config.flag}</span>
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
