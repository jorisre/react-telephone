import { Phone } from 'react-telephone';

export function BasicSample() {
  return (
    <Phone>
      <Phone.Country />
      <Phone.Number placeholder="6 12 34 56 78" />
    </Phone>
  );
}
