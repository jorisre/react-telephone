import { Fragment, useState } from 'react';
import Playground from './Playground';
import Tailwind from './samples/Tailwind';

function ComingSoon() {
  return (
    <span className="bg-grey-700 p-4 text-center text-white rounded-md shadow-sm">
      Coming soon...
    </span>
  );
}

const QUERY_NAME = 'e';

export enum Example {
  Tailwind = 'Tailwind CSS',
  StyledComponents = 'styled-components',
  CssModules = 'CSS Modules',
  InlineStyles = 'Inline Styles',
  Custom = 'Custom',
}

type ExampleKey = keyof typeof Example;

function getDefaultExample() {
  const searchParams = new URLSearchParams(location.search);

  return (searchParams.get(QUERY_NAME) || 'Tailwind') as ExampleKey;
}

function useExample() {
  const [example, setExample] = useState<ExampleKey>(getDefaultExample());

  const handleChange = (e: ExampleKey) => {
    const url = new URL(location.href);
    url.searchParams.set(QUERY_NAME, e);

    history.pushState(null, '', url);
    setExample(e);
  };

  return [example, handleChange] as const;
}

function App() {
  const [example, setExample] = useExample();

  return (
    <div className="min-h-screen bg-black grid place-content-center px-4 md:px-0">
      <h1 className="text-center font-bold anaglyph-3xl md:anaglyph-6xl">
        react-telephone
      </h1>

      <nav className="pt-10 pb-5 md:py-20">
        <select className="shadow-md border border-grey-700/40 md:hidden outline-none h-11 w-full rounded bg-grey-800 px-3 text-white focus:ring-1 focus:ring-blue-300 focus:border-blue-300">
          {Object.entries(Example).map(([key, value]) => (
            <option key={key}>{value} demo</option>
          ))}
        </select>

        <ul className="space-x-4 place-content-center w-full hidden md:inline-flex">
          {Object.entries(Example).map(([key, value]) => (
            <Fragment key={key}>
              <li
                className={`text-xl hover:text-white font-medium transition-all whitespace-nowrap ${
                  example === key ? 'text-white' : 'text-grey-500'
                }`}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setExample(key as ExampleKey);
                  }}
                  href={`?e=${key}`}
                >
                  {value}
                </a>
              </li>
              <li className="text-lg text-grey-500 font-medium ml-4 last:hidden">
                /
              </li>
            </Fragment>
          ))}
        </ul>
      </nav>

      {example === 'Tailwind' ? (
        <Playground>
          <Tailwind />
        </Playground>
      ) : null}

      {example === 'StyledComponents' ? (
        <Playground>
          <ComingSoon />
        </Playground>
      ) : null}

      {example === 'CssModules' ? (
        <Playground>
          <ComingSoon />
        </Playground>
      ) : null}

      {example === 'Custom' ? (
        <Playground>
          <ComingSoon />
        </Playground>
      ) : null}

      {example === 'InlineStyles' ? (
        <Playground>
          <ComingSoon />
        </Playground>
      ) : null}

      <a
        href="https://github.com/jorisre/react-telephone"
        className="bg-blue-300 py-3 px-6 text-center text-lg rounded-full mx-auto mt-12 hover:bg-blue-300/75 focus:ring-1 focus:ring-blue-300 outline-none"
      >
        Documentation
      </a>
    </div>
  );
}

export default App;
