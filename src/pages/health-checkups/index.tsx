import Layout from '../../components/common/Layout';
import Title from '../../components/common/Title';

import HealthCheckupForm from '../../components/healthCheckups/ResultInquiryForm';

export default function HealthCheckupsPage() {
  return (
    <Layout>
      <Title>건강검진결과 조회를 위해 정보를 입력해주세요.</Title>
      <HealthCheckupForm />
    </Layout>
  );
}
