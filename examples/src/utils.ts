export enum Sample {
  Basic = 'Basic',
  Tailwind = 'Tailwind CSS',
  StyledComponents = 'styled-components',
  CssModules = 'CSS Modules',
  InlineStyles = 'Inline Styles',
  Custom = 'Custom',
}

export type SampleKey = keyof typeof Sample;

export function getSampleLinks(name: SampleKey) {
  const GITHUB_REPO_EXAMPLES = `https://github.com/jorisre/react-telephone/tree/main/examples`;
  const githubSamplePath = `src/components/samples/${name}.tsx`;

  return {
    stackblitz:
      GITHUB_REPO_EXAMPLES.replace('github.com', 'stackblitz.com/github') +
      '?file=' +
      githubSamplePath,
    github: GITHUB_REPO_EXAMPLES + githubSamplePath,
  };
}
