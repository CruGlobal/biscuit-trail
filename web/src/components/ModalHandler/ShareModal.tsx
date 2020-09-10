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

const ShareModal = () => {
  const dispatch = useDispatch();
  const roomCode = useSelector(({ auth }: RootState) => auth.room);

  function handleShare() {
    //@ts-ignore
    if (navigator?.share && isFunction(navigator.share)) {
      try {
        navigator
          //@ts-ignore
          .share({
            title: `${getTranslation('shareJoin')} ${roomCode}`,
            url: Configs.ShareUrlBase + `?code=${roomCode}`,
          })
          .then(() => {
            toast.success(getTranslation('thanksSharing'));
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
          <CopyToClipboard text={`${getTranslation('shareJoin')} ${roomCode}`} onCopy={handleShare}>
            <Button text={`${getTranslation('shareCode')} ${roomCode}`} type="secondary" icon="share-2" />
          </CopyToClipboard>
        </div>
      }
    />
  );
};

export default ShareModal;
