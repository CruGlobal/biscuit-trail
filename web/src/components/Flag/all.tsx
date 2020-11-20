import React from 'react';
import { ReactComponent as Us } from '../../assets/flags/us.svg';
import { ReactComponent as Brazil } from '../../assets/flags/brazil.svg';
import { ReactComponent as Italy } from '../../assets/flags/italy.svg';
import { ReactComponent as Portugal } from '../../assets/flags/portugal.svg';
import { ReactComponent as Mexico } from '../../assets/flags/mexico.svg';
import { ReactComponent as Spain } from '../../assets/flags/spain.svg';
import { ReactComponent as Lithuania } from '../../assets/flags/lithuania.svg';
import { ReactComponent as China } from '../../assets/flags/china.svg';
import { ReactComponent as ChinaHK } from '../../assets/flags/china-hk.svg';
import { ReactComponent as SaudiArabia } from '../../assets/flags/saudi-arabia.svg';

// Look up more here: https://openmoji.org/

export function getFlag(name: FlagName, iconProps?: React.SVGProps<SVGSVGElement>) {
  switch (name) {
    case 'us': return <Us {...iconProps} />;
    case 'brazil': return <Brazil {...iconProps} />;
    case 'italy': return <Italy {...iconProps} />;
    case 'portugal': return <Portugal {...iconProps} />;
    case 'mexico': return <Mexico {...iconProps} />;
    case 'spain': return <Spain {...iconProps} />;
    case 'lithuania': return <Lithuania {...iconProps} />;
    case 'china': return <China {...iconProps} />;
    case 'china-hk': return <ChinaHK {...iconProps} />;
    case 'saudi-arabia': return <SaudiArabia {...iconProps} />;
  }
}

export type FlagName =
  | 'us'
  | 'brazil'
  | 'portugal'
  | 'mexico'
  | 'spain'
  | 'lithuania'
  | 'china'
  | 'china-hk'
  | 'saudi-arabia'
  | 'italy';
