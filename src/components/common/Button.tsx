import styled from 'styled-components';

const Button = styled.button`
  font-size: 2.4rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5.6rem 1.6rem;
  width: 100%;
  border: 1px solid ${(props) => props.theme.color.primary};
  border-radius: .8rem;
  color: ${(props) => props.theme.color.text};
  background: ${(props) => props.theme.color.primary};

  &:hover {
    color: ${(props) => props.theme.color.textActive};
    background: ${(props) => props.theme.color.backgroundLight};
  }
`;

export default Button;
