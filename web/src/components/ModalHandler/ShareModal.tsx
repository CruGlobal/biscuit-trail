import React from 'react';
import { closeModal } from 'actions/modal';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import CopyToClipboard from 'react-copy-to-clipboard';

import LOGO from '../../assets/images/logo.png';
import RoundModal from 'components/RoundModal';
import { RootState } from 'reducers';
import { toast } from 'react-toastify';
import { Configs } from '../../constants';
import { getTranslation } from 'utils/translations';
import { isFunction } from 'utils';
import { logEvent } from 'utils/analytics';

const ShareModal = () => {
  const dispatch = useDispatch();
  const roomCode = useSelector(({ auth }: RootState) => auth.room);

  const text = `${getTranslation('shareJoin')} ${window.location.host} ${getTranslation('code')} ${roomCode}`;

  function handleShare() {
    // @ts-ignore
    if (navigator?.share && isFunction(navigator.share)) {
      try {
        navigator
          // @ts-ignore
          .share({ title: text })
          .then(() => {
            toast.success(getTranslation('thanksSharing'));
            logEvent('Share.Copy', { code: roomCode });
          })
          .catch(console.error);
      } catch (error) {}
    } else {
      toast.success(getTranslation('copied'));
    }
  }

  return (
    <RoundModal
      header={getTranslation('share')}
      title={`${getTranslation('havingFun')} ${getTranslation('code')}: ${roomCode}`}
      description={getTranslation('shareDescription')}
      image={LOGO}
      buttonTitle={getTranslation('close')}
      onPress={() => dispatch(closeModal())}
      content={
        <div className="flex items-center flex-1 self-stretch justify-center py-6">
          <CopyToClipboard text={text} onCopy={handleShare}>
            <Button text={`${getTranslation('shareCode')} ${roomCode}`} type="secondary" icon="share-2" />
          </CopyToClipboard>
        </div>
      }
    />
  );
};

export default ShareModal;
