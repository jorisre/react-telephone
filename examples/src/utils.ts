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
  const github = `https://github.com/jorisre/react-telephone/tree/main/examples/src/components/samples/${name}.tsx`;

  return {
    codesandbox: github.replace('github.com', 'githubbox.com'),
    github,
  };
}
