import Layout from '../components/common/Layout';
import Title from '../components/common/Title';

import HealthCheckupForm from '../components/healthCheckups/HealthCheckupForm';

export default function HealthCheckupsPage() {
  return (
    <Layout>
      <Title>내 정보 입력</Title>
      <HealthCheckupForm />
    </Layout>
  );
}
