import styled from 'styled-components';

import useCheckupResultStore from '../../stores/checkupResult';

import Layout from '../../components/common/Layout';
import Title from '../../components/common/Title';

import ResultDashboard from '../../components/healthCheckups/ResultDashboard';
import ResultChart from '../../components/healthCheckups/ResultChart';

const Notice = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;

const DashboardWrapper = styled.div`
  width: 100%;
  max-height: 50rem;
  overflow-y: auto;
`;

export default function HealthCheckupsPage() {
  const resultData = useCheckupResultStore((state) => state.resultData);

  if (!resultData) {
    return (
      <Layout>
        <Title>건강검진 결과 대시보드</Title>
        <Notice>건강검진 결과 데이터가 없습니다.</Notice>
      </Layout>
    );
  }

  return (
    <Layout>
      <Title>건강검진 결과 대시보드</Title>
      <Notice>
        {resultData.patientName}
        님의 건강검진 결과
      </Notice>
      <DashboardWrapper>
        <ResultDashboard checkupResultData={resultData} />
      </DashboardWrapper>
      <ResultChart checkupResultData={resultData} />
    </Layout>
  );
}
