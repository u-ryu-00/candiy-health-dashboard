import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  color: ${(props) => props.theme.color.text};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.remToVw(3.2)};
  }
`;

export default Title;
