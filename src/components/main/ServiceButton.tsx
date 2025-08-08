import { HTMLAttributes } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

const Container = styled.button`
  font-size: 2.4rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5.6rem 1.6rem;
  width: 100%;
  border-radius: .8rem;
  color: ${(props) => props.theme.color.text};
  background: ${(props) => props.theme.color.primary};

  &:hover {
    color: ${(props) => props.theme.color.textActive};
    background: ${(props) => props.theme.color.backgroundLight};
  }
`;

type ServiceButtonProps = HTMLAttributes<Element> & {
  path: string;
}

export default function ServiceButton({
  path, children,
}: ServiceButtonProps) {
  const router = useRouter();

  const handleClickServiceButton = () => {
    router.push(path);
  };

  return (
    <Container onClick={handleClickServiceButton}>
      {children}
    </Container>
  );
}
