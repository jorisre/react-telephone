import { SampleKey } from '../../utils';
import { BasicSample } from './Basic';
import { CssModulesSample } from './CssModules';
import { InlineStylesSample } from './InlineStyles';
import { ReactHookFormSample } from './ReactHookForm';
import { StyledComponentsSample } from './StyledComponents';
import { TailwindSample } from './Tailwind';

export const Samples: Record<SampleKey, () => JSX.Element> = {
  Basic: BasicSample,
  Tailwind: TailwindSample,
  CssModules: CssModulesSample,
  ReactHookForm: ReactHookFormSample,
  InlineStyles: InlineStylesSample,
  StyledComponents: StyledComponentsSample,
};
