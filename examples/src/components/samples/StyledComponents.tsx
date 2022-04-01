import { Phone } from 'react-telephone';
import styled from 'styled-components';

const StyledPhone = styled(Phone)`
  position: relative;
  border-radius: 4px;
  color: #ffffff;
  background-color: #141414;
`;

const StyledCountry = styled(Phone.Country)`
  display: block;
  background-color: transparent;
  padding: 8px;
  outline: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
  border: 1px solid rgb(174 174 174 / 0.5);

  &:focus {
    box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px,
      rgb(30, 242, 241) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  }
`;

const StyledNumber = styled(Phone.Number)`
  display: block;
  background-color: transparent;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid rgb(174 174 174 / 0.5);
  outline: none;
  width: 100%;
  margin-top: -1px;
  font-size: 1rem;
  line-height: 1.5rem;

  &:focus {
    box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px,
      rgb(30, 242, 241) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  }
`;

export function StyledComponentsSample() {
  return (
    <StyledPhone>
      <StyledCountry />
      <StyledNumber placeholder="6 12 34 56 78" />
    </StyledPhone>
  );
}
