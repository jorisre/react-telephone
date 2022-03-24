import { Fragment, useState } from 'react';
import { Footer, Playground, Samples } from './components';
import { getSampleLinks, Sample, SampleKey } from './utils';

const QUERY_NAME = 'sample';

function getDefaultSample() {
  const searchParams = new URLSearchParams(location.search);

  return (searchParams.get(QUERY_NAME) || 'Tailwind') as SampleKey;
}

function useSample() {
  const [sample, setSample] = useState<SampleKey>(getDefaultSample());

  const handleChange = (e: SampleKey) => {
    const url = new URL(location.href);
    url.searchParams.set(QUERY_NAME, e);

    history.pushState(null, '', url);
    setSample(e);
  };

  return [sample, handleChange] as const;
}

function App() {
  const [currentSample, setCurrentSample] = useSample();

  const SampleComponent = Samples[currentSample];

  return (
    <div className="min-h-screen bg-black grid place-content-center px-4 md:px-0">
      <h1 className="text-center font-bold anaglyph-3xl md:anaglyph-6xl">
        react-telephone
      </h1>

      <nav className="pt-10 pb-5 md:py-20">
        <select
          onChange={(e) => setCurrentSample(e.target.value as SampleKey)}
          className="shadow-md border border-grey-700/40 md:hidden outline-none h-11 w-full rounded bg-grey-800 px-3 text-white focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
        >
          {Object.entries(Sample).map(([key, name]) => (
            <option key={key} value={key}>
              {name} demo
            </option>
          ))}
        </select>

        <ul className="space-x-4 place-content-center w-full hidden md:inline-flex">
          {Object.entries(Sample).map(([key, name]) => (
            <Fragment key={key}>
              <li
                className={`text-xl hover:text-white font-medium transition-all whitespace-nowrap ${
                  currentSample === key ? 'text-white' : 'text-grey-500'
                }`}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentSample(key as SampleKey);
                  }}
                  href={`?e=${key}`}
                >
                  {name}
                </a>
              </li>
              <li className="text-lg text-grey-500 font-medium ml-4 last:hidden">
                /
              </li>
            </Fragment>
          ))}
        </ul>
      </nav>

      <Playground {...getSampleLinks(currentSample)}>
        <SampleComponent />
      </Playground>

      <a
        href="https://github.com/jorisre/react-telephone"
        className="bg-blue-300 py-3 px-6 text-center text-lg rounded-full mx-auto mt-12 hover:bg-blue-300/75 focus:ring-1 focus:ring-blue-300 outline-none"
      >
        Documentation
      </a>
      <Footer />
    </div>
  );
}

export default App;
