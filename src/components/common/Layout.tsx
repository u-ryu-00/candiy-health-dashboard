import { HTMLAttributes } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  min-width: ${({ theme }) => theme.layout.mobileMinWidth};
  height: 100vh;
  height: ${() => '100dvh'};
  background: ${(props) => props.theme.color.primary};
`;

const Content = styled.div`
  flex: 1;
  padding: 4.8rem 1.6rem;
  min-width: ${({ theme }) => theme.layout.mobileMinWidth};
  max-width: ${({ theme }) => theme.layout.contentWidth};
  background: ${({ theme }) => theme.color.background};
`;

type LayoutProps = HTMLAttributes<Element>;

export default function Layout({
  children, className,
}: LayoutProps) {
  return (
    <Container>
      <Content className={className}>
        {children}
      </Content>
    </Container>
  );
}
