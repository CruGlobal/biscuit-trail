import React, { HTMLAttributes, ReactNode, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import { IconName } from '../Icon/all';
import { Card, TextLine } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import UserComponent from 'components/UserComponent';
import Button from 'components/Button';
import { openCardModal } from 'actions/modal';
import { User } from 'actions/socket';
import { getTranslationFront } from 'utils/translations';
import { useLangChange } from 'utils/hooks';

interface CardProps {
  data: Card;
  onPickupCard?: any;
  onDropCard?: any;
  onClick?: any;
  icon?: IconName;
  iconPosition?: 'left' | 'right' | 'center';
  type?: 'primary' | 'secondary';
  top?: number;
  left?: number;
  zIndex?: number;
}

export default function CardComponent({ data, zIndex, onPickupCard, onDropCard, top, left }: CardProps) {
  const cardLockedUser = useSelector(({ game }: RootState) => game.locked[data.id]);
  const board = useSelector(({ game }: RootState) => game.board);
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id: data.id, top: data.defaultPosition.top, left: data.defaultPosition.left },
    begin: onPickupCard,
    end: onDropCard,
    canDrag: () => !cardLockedUser,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  // console.log('data', data, cardLockedUser, isDragging);

  return (
    <div
      ref={drag}
      className={classNames('cardSize card p-1', {
        'shadow-lg opacity-25': isDragging,
        absolute: !board.includes(data.id),
        relative: board.includes(data.id),
      })}
      style={{
        backgroundColor: data.backgroundColor,
        zIndex: isDragging ? 1000 : zIndex,
        ...(!!cardLockedUser ? { opacity: 0.5 } : {}),
        top: board.includes(data.id) ? undefined : top,
        left: board.includes(data.id) ? undefined : left,
      }}
      onClick={() => dispatch(openCardModal({ card: data }))}
    >
      {cardLockedUser && (
        <div className="absolute" style={{ top: -10, left: -10 }}>
          <UserComponent user={cardLockedUser} className="shadow-lg" />
        </div>
      )}
      <CardContent data={data} />
    </div>
  );
}

export function FixedCard({ data }: { data: Card }) {
  const dispatch = useDispatch();
  return (
    <div
      className={classNames('cardSize card relative p-4')}
      style={{ backgroundColor: data.backgroundColor }}
      onClick={() => dispatch(openCardModal({ card: data }))}
    >
      <CardContent data={data} />
    </div>
  );
}

export function SelectCard({
  data,
  onSelect,
  isSelected,
}: {
  data: Card;
  onSelect: (b: boolean) => any;
  isSelected: boolean;
}) {
  const dispatch = useDispatch();
  return (
    <div
      className={classNames('cardSizeLarge card relative', { ' border-4 border-yellow-400': isSelected })}
      style={{ backgroundColor: data.backgroundColor }}
      onClick={() => onSelect(!isSelected)}
    >
      <CardContent data={data} />
      <div className="absolute top-0 left-0 m-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(openCardModal({ card: data }));
          }}
          icon="zoom-in"
          iconSize={20}
          className={classNames('text-white bg-transparent p-0 lg:p-2 rounded-full')}
        />
      </div>
    </div>
  );
}

export function DiscussCard({ data, users }: { data: Card; users: User[] }) {
  const dispatch = useDispatch();
  return (
    <div
      className={classNames('cardSizeLarge card relative')}
      style={{ backgroundColor: data.backgroundColor }}
      onClick={() => dispatch(openCardModal({ card: data }))}
    >
      <CardContent data={data} />
      <div className="absolute m-2" style={{ top: -15, left: -15 }}>
        {users.map((u, i) => (
          <div key={`${u.id}_${i}`} className="absolute top-0" style={{ left: 20 * i }}>
            <UserComponent user={u} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardContent({ data, position }: { data: Card; position?: number }) {
  useLangChange();
  return (
    <div
      className={classNames(
        'flex items-center justify-center w-full h-full leading-tight sm:leading-snug text-xs xs:text-base sm:text-lg xl2:text-xl flex-col font-thin relative px-1 sm:px-2',
      )}
    >
      {position && <div className="absolute text-xl text-white font-bold top-0 left-0 p-1">{position}</div>}
      {getTranslationFront(data.id).map((l: { text: string; isBold?: boolean }, i: number) => (
        <div
          key={i}
          className={classNames('flex items-center justify-center text-white w-full text-center', {
            'font-semibold': l.isBold,
          })}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
}

export function BasicLargeCard({ data }: { data: Card }) {
  const dispatch = useDispatch();
  return (
    <div
      className={classNames('cardSizeLarge card p-4')}
      style={{ backgroundColor: data.backgroundColor }}
      onClick={() => dispatch(openCardModal({ card: data }))}
    >
      <CardContent data={data} />
    </div>
  );
}
