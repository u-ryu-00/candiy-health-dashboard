import styled from 'styled-components';

import Layout from '../components/common/Layout';
import Title from '../components/common/Title';

import ServiceButton from '../components/main/ServiceButton';

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    gap: ${({ theme }) => theme.remToVw(1.6)};
  }
`;

export default function HomePage() {
  return (
    <Layout>
      <Title>개인 맞춤형 건강 분석 서비스에 오신 걸 환영합니다.</Title>
      <ButtonWrapper>
        <ServiceButton path="/health-checkups">
          건강검진결과
        </ServiceButton>
        <ServiceButton path="/treatments">
          진료 및 투약정보
        </ServiceButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <ServiceButton path="/records">
          내 진료 정보 열람
        </ServiceButton>
        <ServiceButton path="/pills">
          내가 먹는 약 한눈에
        </ServiceButton>
      </ButtonWrapper>
    </Layout>
  );
}
