import React, { ReactNode } from 'react';
import ModalWrapper from 'components/ModalHandler/ModalWrapper';

interface RoundModalProps {
  image: string;
  header: string;
  title: string;
  description: string;
  onPress: any;
  buttonTitle: string;
  content?: ReactNode;
}

export default function RoundModal({
  image,
  header,
  title,
  description,
  onPress,
  buttonTitle,
  content,
}: RoundModalProps) {
  return (
    <ModalWrapper dontClickOutside={true}>
      <div
        className="w-full bg-gray-500 text-center flex items-center justify-center font-semibold text-white"
        style={{ height: 45 }}
      >
        {header}
      </div>
      <div className="flex-1 items-center justify-center text-center text-darkBlue text-2xl sm:text-3xl leading-tight font-medium font-title px-3 sm:px-8 py-3 sm:py-10 mb-4 pb-3 sm:pb-8">
        <img src={image} alt="..." className="w-full m-auto" style={{ maxWidth: 200 }} />
        <div className="pt-8 px-4">{title}</div>
        {description && <div className="text-base pt-6 text-grey leading-6">{description}</div>}
      </div>
      {content}
      <div
        className="w-full bg-lightBlue flex items-center justify-center text-white text-lg font-semibold cursor-pointer"
        style={{ height: 60 }}
        onClick={onPress}
      >
        {buttonTitle}
      </div>
    </ModalWrapper>
  );
}
