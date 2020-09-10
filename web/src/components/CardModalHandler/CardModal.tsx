import React, { useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Card, TextLine } from 'utils/types';
import Icon from 'components/Icon';
import { useOnClickOutside } from 'utils/hooks';
import { closeCardModal } from 'actions/modal';
import { getTranslationFront, getTranslationBack } from 'utils/translations';
import Card1 from 'assets/images/Card1Download.jpg';
import Card2 from 'assets/images/Card2Download.png';
import Card3 from 'assets/images/Card3Download.png';
import Card4 from 'assets/images/Card4Download.png';
import Card5 from 'assets/images/Card5Download.png';
import Card6 from 'assets/images/Card6Download.png';
import Card7 from 'assets/images/Card7Download.png';
import Card8 from 'assets/images/Card8Download.png';
import Card9 from 'assets/images/Card9Download.png';
import Card10 from 'assets/images/Card10Download.png';
import Card11 from 'assets/images/Card11Download.png';
import Card12 from 'assets/images/Card12Download.png';

const Downloads: any = {
  card1: Card1,
  card2: Card2,
  card3: Card3,
  card4: Card4,
  card5: Card5,
  card6: Card6,
  card7: Card7,
  card8: Card8,
  card9: Card9,
  card10: Card10,
  card11: Card11,
  card12: Card12,
};

interface CardModalProps {
  card: Card;
}

const ModalWrapper = ({ children }: { children?: ReactNode }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(closeCardModal());
  });

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
      <div
        className="modal-overlay absolute w-full h-full bg-black opacity-75"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(closeCardModal());
        }}
        style={{ touchAction: 'none' }}
      ></div>
      <div
        ref={modalRef}
        className="modal-container mx-auto relative w-11/12 sm:w-4/5 md:max-w-2xl animated zoomIn animate300"
      >
        <div
          className="rounded-lg shadow z-50 overflow-y-auto customFlip"
          style={{
            height: (Math.min((11 / 12) * window.innerWidth, 672) * 3) / 4,
            backgroundColor: 'transparent',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const CardModal = ({ card }: CardModalProps) => {
  const dispatch = useDispatch();
  const [isBack, setIsBack] = useState(false);
  return (
    <ModalWrapper>
      <div
        className={classNames('customFlipInner')}
        style={{
          transform: isBack ? 'rotateY(180deg)' : undefined,
        }}
      >
        <div
          className={classNames(
            'flex items-center justify-center w-full h-full text-4xl flex-col font-thin leading-tight customFlipFront',
          )}
          style={{ backgroundColor: card.backgroundColor }}
        >
          {getTranslationFront(card.id).map((l, i: number) => (
            <div
              key={i}
              className={classNames(
                'flex items-center justify-center text-white w-full text-center text-4xl lg:text-6xl ',
                {
                  'font-semibold': l.isBold,
                },
              )}
            >
              {l.text}
            </div>
          ))}
        </div>
        <div
          className={classNames(
            'w-full p-4 leading-tight text-center overflow-auto customFlipBack whitespace-pre-wrap',
          )}
          style={{ backgroundColor: '#828383', height: (Math.min((11 / 12) * window.innerWidth, 672) * 3) / 4 }}
        >
          <div className="text-black text-lg font-semibold my-2 mb-5">{getTranslationBack(card.id).top}</div>
          <div className="relative mb-4">
            <div
              className="px-4 py-1 text-white text-xl font-bold text-right absolute right-0"
              style={{ backgroundColor: card.backgroundColor, width: 200, top: -15 }}
            >
              Be Prepared
            </div>
            <div className="bg-white p-4 py-6 text-base my-2">{getTranslationBack(card.id).steps}</div>
          </div>
          <div className="bg-white p-3 mx-4 lg:mx-12 text-sm font-thin italic my-2 mb-6">
            {getTranslationBack(card.id).example}
          </div>
        </div>
      </div>
      <div onClick={() => setIsBack(!isBack)} className="absolute bottom-0 right-0 mr-3 mb-3">
        <Icon name="rotate-cw" className="text-white hover:text-gray-300 cursor-pointer" size={24} />
      </div>
      <div className="absolute bottom-0 right-0 mr-12 mb-3">
        <a href={Downloads[card.id]} download={card.id || true}>
          <Icon name="arrow-down-circle" className="text-white hover:text-gray-300 cursor-pointer" size={24} />
        </a>
      </div>
    </ModalWrapper>
  );
};

export default CardModal;
