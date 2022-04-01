import { Phone } from 'react-telephone';
import styles from './styles.module.css';

export function CssModulesSample() {
  return (
    <Phone className={styles.phone}>
      <Phone.Country className={styles.country} />
      <Phone.Number placeholder="6 12 34 56 78" className={styles.number} />
    </Phone>
  );
}
