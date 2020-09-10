import React, { HTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import { IconName } from 'components/Icon/all';
import Icon from 'components/Icon';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  onChangeText?: (t: string, e: React.ChangeEvent<HTMLInputElement>) => any;
  onEnter?: (e?: React.KeyboardEvent<HTMLInputElement>) => any;
  onCtrlEnter?: (e?: React.KeyboardEvent<HTMLInputElement>) => any;
  disabled?: boolean;
  icon?: IconName;
  value?: string | number;
  error?: string;
  type?: string;
  invertedColors?: boolean;
}

const Input = forwardRef(
  (
    {
      onChangeText,
      onChange,
      disabled,
      icon,
      className,
      error,
      value,
      type,
      onEnter,
      onCtrlEnter,
      invertedColors,
      ...rest
    }: InputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (onChangeText) {
        onChangeText(e.target.value, e);
      } else if (onChange) {
        onChange(e);
      }
    }
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter' && onEnter) {
        e.preventDefault();
        e.stopPropagation();
        onEnter(e);
      } else if (onCtrlEnter && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.stopPropagation();
        onCtrlEnter(e);
      }
    }
    return (
      <div className={classNames('flex flex-col items-start justify-center w-full')}>
        {icon ? <Icon name={icon} className="ml-2 absolute text-grey" size={18} /> : null}
        <input
          ref={ref}
          className={classNames(
            'shadow-sm appearance-none rounded-lg w-full py-2 px-3 text-darkBlue leading-tight focus:outline-none focus:shadow-outline focus:bg-white text-sm',
            { 'bg-grey': disabled },
            { 'bg-gray-200': invertedColors },
            { 'pl-8': !!icon },
            { 'border-red-500': !!error },
            className,
          )}
          type={type || 'text'}
          disabled={disabled}
          value={value === null ? '' : value}
          onKeyDown={onEnter || onCtrlEnter ? handleKeyDown : undefined}
          {...rest}
          onChange={handleChange}
        />
        {error ? <div className="text-xs text-red-500">{error}</div> : null}
      </div>
    );
  },
);

export default Input;
