import React, { HTMLAttributes } from 'react';
import { getIcon, IconName } from './all';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  style?: HTMLAttributes<HTMLSpanElement>['style'];
  className?: HTMLAttributes<HTMLSpanElement>['className'];
  size?: number;
}
export default function Icon({ name, style, className, size, ...rest }: IconProps) {
  return (
    <span style={style} className={className}>
      {getIcon(name, { ...rest, ...(size ? { width: size, height: size } : {}) })}
    </span>
  );
}
