import React, { HTMLAttributes, useMemo } from 'react';
import classNames from 'classnames';
import colorThis from '@eknowles/color-this';
import { User } from 'actions/socket';

interface UserProps extends HTMLAttributes<HTMLDivElement> {
  user: User;
  size?: number;
}

function getInitials(user: User) {
  return user.name
    ? user.name
        .split(' ')
        .map((n) => (n[0] || '').trim())
        // get the first and last item
        .filter((n, i, arr) => i === 0 || i === arr.length - 1)
        .join('')
        .toUpperCase()
        .trim()
    : '-';
}

function UserComponent({ user, className, size = 40 }: UserProps) {
  const color = useMemo(() => colorThis(`${user.name || ''}${user.id}`, 4), [user]);

  return (
    <div
      className={classNames(
        'flex items-center content-center justify-center bg-white shadow-xs rounded-full text-white text-sm',
        className,
      )}
      style={{ width: size, height: size, backgroundColor: color }}
      title={user.name || ''}
    >
      {getInitials(user)}
    </div>
  );
}

export default UserComponent;
