import { SampleKey } from '../../utils';
import { ComingSoon } from '../ComingSoon';
import { BasicSample } from './Basic';

import { TailwindSample } from './Tailwind';

export const Samples: Record<SampleKey, () => JSX.Element> = {
  Basic: BasicSample,
  Tailwind: TailwindSample,
  CssModules: ComingSoon,
  Custom: ComingSoon,
  InlineStyles: ComingSoon,
  StyledComponents: ComingSoon,
};
