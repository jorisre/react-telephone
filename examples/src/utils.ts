import { getParameters } from 'codesandbox/lib/api/define';

export enum Sample {
  Basic = 'Basic',
  Tailwind = 'Tailwind CSS',
  StyledComponents = 'styled-components',
  CssModules = 'CSS Modules',
  InlineStyles = 'Inline Styles',
  Custom = 'Custom',
}

export type SampleKey = keyof typeof Sample;

const parameters = getParameters({
  template: 'create-react-app-typescript',
  files: {
    'package.json': {
      // eslint-disable-next-line
      // @ts-expect-error
      content: {
        dependencies: {
          'react-telephone': 'latest',
          react: 'latest',
          'react-dom': 'latest',
        },
      },
    },
  },
});

export function getSampleLinks(name: SampleKey) {
  return {
    codesandbox: `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`,
    github: `https://github.com/jorisre/react-telephone/blob/main/examples/src/samples/${name}.tsx`,
  };
}
