import { Phone } from 'react-telephone';

export function InlineStylesSample() {
  return (
    <Phone
      style={{
        position: 'relative',
        borderRadius: '0.25rem',
        color: '#FFF',
        backgroundColor: '#141414',
      }}
    >
      <Phone.Country
        style={{
          display: 'block',
          backgroundColor: 'transparent',
          padding: '0.5rem',
          outline: 'none',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          fontSize: '1rem',
          lineHeight: '1.5rem',
          border: '1px solid rgb(174 174 174 / 0.5)',
        }}
        className="focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
      />
      <Phone.Number
        placeholder="6 12 34 56 78"
        style={{
          display: 'block',
          backgroundColor: 'transparent',
          paddingLeft: '0.75rem',
          paddingRight: '0.75rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
          border: '1px solid rgb(174 174 174 / 0.5)',
          outline: 'none',
          width: '100%',
          marginTop: '-1px',
          fontSize: '1rem',
          lineHeight: '1.5rem',
        }}
        className="focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
      />
    </Phone>
  );
}
