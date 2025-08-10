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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  padding: 4.8rem 1.6rem;
  min-width: ${({ theme }) => theme.layout.mobileMinWidth};
  max-width: ${({ theme }) => theme.layout.contentWidth};
  background: ${({ theme }) => theme.color.background};
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    gap: ${({ theme }) => theme.remToVw(2.4)};
    padding: ${({ theme }) => theme.remToVw(4.8)} ${({ theme }) => theme.remToVw(1.6)};
  }
`;

type LayoutProps = HTMLAttributes<Element>;

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Content>
        {children}
      </Content>
    </Container>
  );
}
