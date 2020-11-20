import React, { HTMLAttributes } from 'react';
import { getFlag, FlagName } from './all';

// Look up more here: https://openmoji.org/
export interface FlagProps extends React.SVGProps<SVGSVGElement> {
  name: FlagName;
  style?: HTMLAttributes<HTMLSpanElement>['style'];
  className?: HTMLAttributes<HTMLSpanElement>['className'];
  size?: number;
}
export default function Flag({ name, style, className, size = 24, ...rest }: FlagProps) {
  return (
    <span style={style} className={className}>
      {getFlag(name, { ...rest, ...(size ? { width: size, height: size } : {}) })}
    </span>
  );
}
