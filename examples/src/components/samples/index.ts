import { SampleKey } from '../../utils';
import { ComingSoon } from '../ComingSoon';

import { TailwindSample } from './Tailwind';

export const Samples: Record<SampleKey, () => JSX.Element> = {
  Tailwind: TailwindSample,
  CssModules: ComingSoon,
  Custom: ComingSoon,
  InlineStyles: ComingSoon,
  StyledComponents: ComingSoon,
};
