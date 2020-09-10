import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import Round1Modal from './Round1Modal';
import Round2Modal from './Round2Modal';
import Round3Modal from './Round3Modal';
import Round4Modal from './Round4Modal';
import HostSettingsModal from './HostSettingsModal';
import PlayersModal from './PlayersModal';
import ShareModal from './ShareModal';
import Round2Discuss from './Round2Discuss';

export type ModalTypes =
  | 'Round1'
  | 'Round2'
  | 'Round3'
  | 'Round4'
  | 'HostSettings'
  | 'Players'
  | 'Share'
  | 'Round2Discuss';

export function ModalHandler() {
  const modalType = useSelector(({ modal }: RootState) => modal.modalType);
  const props = useSelector(({ modal }: RootState) => modal.props);

  switch (modalType) {
    case 'Round1':
      return <Round1Modal {...props} />;
    case 'Round2':
      return <Round2Modal {...props} />;
    case 'Round3':
      return <Round3Modal {...props} />;
    case 'Round4':
      return <Round4Modal {...props} />;
    case 'HostSettings':
      return <HostSettingsModal {...props} />;
    case 'Players':
      return <PlayersModal {...props} />;
    case 'Share':
      return <ShareModal {...props} />;
    case 'Round2Discuss':
      return <Round2Discuss {...props} />;
    default:
      return null;
  }
}
export default ModalHandler;
