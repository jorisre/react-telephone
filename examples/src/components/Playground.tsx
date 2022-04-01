interface AProps extends React.ComponentProps<'a'> {
  icon: React.ReactNode;
}

function A({ children, icon, ...props }: AProps) {
  return (
    <a
      className="p-4 hover:bg-grey-700/75 bg-grey-700 inline-flex place-content-center cursor-pointer"
      {...props}
    >
      {icon}
      {children}
    </a>
  );
}

interface Props {
  children: React.ReactNode;
  github?: string;
  stackblitz?: string;
}

export function Playground({
  children,
  github,
  stackblitz: stackblitz,
}: Props) {
  return (
    <main>
      <div
        className="relative py-14 px-3 md:px-10 md:py-16 grid place-content-center rounded-t-md bg-grey-800 overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(174, 174, 174, .01) .1em, transparent .1em), linear-gradient(90deg, rgba(174, 174, 174, .01) .1em, transparent .1em)',
          backgroundSize: '2em 2em',
        }}
      >
        {children}
      </div>

      <div className="text-white grid grid-cols-2 rounded-b-md divide-grey-500/25 divide-x-2 overflow-hidden text-center">
        {github ? (
          <A
            href={github}
            target="_blank"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            }
          >
            Github
          </A>
        ) : null}

        {stackblitz ? (
          <A
            href={stackblitz}
            target="_blank"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            }
          >
            StackBlitz
          </A>
        ) : null}
      </div>
    </main>
  );
}
