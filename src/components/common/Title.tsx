import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  color: ${(props) => props.theme.color.text};
`;

export default Title;
