import { SampleKey } from '../../utils';
import { ComingSoon } from '../ComingSoon';
import { BasicSample } from './Basic';
import { CssModulesSample } from './CssModules';
import { StyledComponentsSample } from './StyledComponents';
import { TailwindSample } from './Tailwind';

export const Samples: Record<SampleKey, () => JSX.Element> = {
  Basic: BasicSample,
  Tailwind: TailwindSample,
  CssModules: CssModulesSample,
  Custom: ComingSoon,
  InlineStyles: ComingSoon,
  StyledComponents: StyledComponentsSample,
};
