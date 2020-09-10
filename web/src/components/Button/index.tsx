import React, { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { IconName } from '../Icon/all';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text?: ReactNode;
  isSelected?: boolean;
  disabled?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right' | 'center';
  type?: 'primary' | 'secondary' | 'transparent' | 'accent';
  children?: ReactNode;
  isLoading?: boolean;
  iconSize?: number;
  iconClassName?: HTMLAttributes<HTMLSpanElement>['className'];
}

export default function Button({
  text,
  icon,
  iconPosition = 'left',
  type,
  onClick,
  isSelected = false,
  disabled,
  className,
  children,
  iconSize,
  iconClassName = '',
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        'inline-flex items-center font-medium outline-none focus:outline-none',
        {
          'rounded-lg py-1 md:py-2 px-1 md:px-4 bg-lightBlue hover:bg-blue text-white hover:text-white':
            type === 'primary',
          'rounded-lg py-1 md:py-2 px-1 md:px-4 bg-yellow-500 hover:bg-yellow-300 text-white hover:text-white':
            type === 'accent',
          'rounded-lg py-1 md:py-2 px-1 md:px-4 bg-white border border-lightGrey hover:bg-gray-300 text-darkBlue':
            type === 'secondary',
          'bg-transparent hover:bg-transparent hover:text-lightBlue text-grey py-0 px-0 font-medium rounded-none':
            type === 'transparent',
          'py-0 px-0 font-medium text-lightBlue border-b-2 border-lightBlue rounded-none block': isSelected,
          'opacity-50': disabled,
        },
        className,
      )}
      {...rest}
      onClick={onClick}
    >
      {isLoading ? (
        <>...</>
      ) : (
        <>
          {children}
          {icon && text && iconPosition === 'left' && (
            <Icon
              name={icon}
              size={iconSize || 17}
              className={classNames(iconClassName, 'py-1 pr-2 mr-2 border-solid border-r border-gray')}
            />
          )}
          {text}
          {icon && (iconPosition === 'center' || !text) && (
            <Icon name={icon} size={iconSize || 24} className={classNames(iconClassName)} />
          )}
          {icon && text && iconPosition === 'right' && (
            <Icon
              name={icon}
              size={iconSize || 17}
              className={classNames(iconClassName, 'py-1 pl-2 ml-2 border-solid border-l border-gray')}
            />
          )}
        </>
      )}
    </button>
  );
}
