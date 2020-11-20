import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { openModal } from 'actions/modal';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { useDispatch } from 'react-redux';
import { useOnClickOutside } from 'utils/hooks';
import { Configs } from '../../constants';
import { logEvent } from 'utils/analytics';

export default function MoreMenu({ isHost }: { isHost?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  function handleSettings(event: any) {
    setIsMenuOpen(false);
    dispatch(openModal('HostSettings'));
    logEvent('Menu.Modal.HostSettings');
  }
  function handlePlayers(event: any) {
    setIsMenuOpen(false);
    dispatch(openModal('Players'));
    logEvent('Menu.Modal.Players');
  }
  function handleShare(event: any) {
    setIsMenuOpen(false);
    dispatch(openModal('Share'));
    logEvent('Menu.Modal.Share');
  }
  useOnClickOutside(menuRef, (event: any) => {
    setIsMenuOpen(false);
  });
  return (
    <div className="" ref={menuRef}>
      <Button
        onClick={() => {
          // TODO: Are you sure?
          // onLogout();
          setIsMenuOpen(!isMenuOpen);
        }}
        icon={isMenuOpen ? 'x' : 'menu'}
        iconSize={25}
        style={{ padding: 10 }}
        className={classNames('text-white rounded-full', {
          'bg-blue': isMenuOpen,
          'bg-lightBlue': !isMenuOpen,
        })}
      />
      <div className="relative">
        {isMenuOpen && (
          <div className="flex flex-col bg-white items-center mt-2 rounded-lg animated zoomIn faster">
            <div className="px-1 py-4 hover:text-yellow-500 text-lightBlue cursor-pointer" onClick={handlePlayers}>
              <Icon name="user" size={25} />
            </div>
            <div className="px-1 py-4 hover:text-yellow-500 text-lightBlue cursor-pointer" onClick={handleShare}>
              <Icon name="share-2" size={25} />
            </div>
            <a
              className="px-1 py-4 hover:text-yellow-500 text-lightBlue cursor-pointer"
              href="https://www.biscuittrail.com/"
              target="_blank"
            >
              <Icon name="help-circle" size={25} />
            </a>
            <a
              className="px-1 py-4 hover:text-yellow-500 text-lightBlue cursor-pointer"
              href={Configs.YoutubeUrl}
              target="_blank"
            >
              <Icon name="youtube" size={25} />
            </a>
            {isHost && (
              <div className="px-1 py-4 hover:text-yellow-500 text-lightBlue cursor-pointer" onClick={handleSettings}>
                <Icon name="settings" size={25} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
