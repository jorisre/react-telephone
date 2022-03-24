import { Phone } from 'react-telephone';

export function TailwindSample() {
  return (
    <Phone className="relative rounded text-white shadow-sm bg-grey-800 -space-y-px">
      <Phone.Country className="block bg-transparent p-2 outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 rounded-none rounded-t border border-grey-500/50 text-base" />
      <Phone.Number
        placeholder="6 12 34 56 78"
        className="block bg-transparent px-3 py-2 rounded-none rounded-b border outline-none w-full border-grey-500/50 text-base placeholder:text-grey-500/40 focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
      />
    </Phone>
  );
}
