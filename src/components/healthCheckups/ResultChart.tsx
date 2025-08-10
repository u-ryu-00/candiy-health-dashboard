import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, BarElement,
  Tooltip, Legend, ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import styled from 'styled-components';

import { sortOverviewListByDate } from '../../utils';

import { CheckupResultData } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
);

const Container = styled.div`
  padding: 2rem;
  width: 100%;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.color.backgroundLight};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: ${({ theme }) => theme.remToVw(2)};
    border-radius: ${({ theme }) => theme.remToVw(0.8)};
  }
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.textDark};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.remToVw(1.8)};
  }
`;

const ChartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.remToVw(1)};
    margin-top: ${({ theme }) => theme.remToVw(2)};
  }
`;

const Chart = styled.div`
  width: 100%;
  height: 30rem;
  background: #FFFFFF;
  overflow-x: auto;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    height: ${({ theme }) => theme.remToVw(30)};
  }
`;

type ResultChartProps = {
  checkupResultData: CheckupResultData;
};

export default function ResultChart({ checkupResultData }: ResultChartProps) {
  const sortedOverviewList = sortOverviewListByDate(checkupResultData.overviewList);

  const recentData = sortedOverviewList.slice(-5);
  const labels = recentData.map((overview) => overview.checkupDate);
  const unit = checkupResultData.referenceList.find((reference) => reference.refType === '단위');

  const parseBloodPressure = (bloodPressure: string) => {
    const parts = bloodPressure.split('/');

    return {
      systolic: parseFloat(parts[0].trim()) || 0,
      diastolic: parseFloat(parts[1].trim()) || 0,
    };
  };

  const heightData = {
    labels,
    datasets: [
      {
        label: `키 (${unit?.height})`,
        data: recentData.map((overview) => parseFloat(overview.height)),
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        tension: 0.1,
        pointBackgroundColor: '#FF6384',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const weightData = {
    labels,
    datasets: [
      {
        label: `몸무게 (${unit?.weight})`,
        data: recentData.map((overview) => parseFloat(overview.weight)),
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
        tension: 0.1,
        pointBackgroundColor: '#36A2EB',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const bmiData = {
    labels,
    datasets: [
      {
        label: `BMI (${unit?.BMI})`,
        data: recentData.map((overview) => parseFloat(overview.BMI)),
        borderColor: '#4BC0C0',
        backgroundColor: '#4BC0C0',
        tension: 0.1,
        pointBackgroundColor: '#4BC0C0',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const bloodPressureData = {
    labels,
    datasets: [
      {
        label: `수축기 혈압 (${unit?.bloodPressure})`,
        data: recentData.map((overview) => parseBloodPressure(overview.bloodPressure).systolic),
        borderColor: '#FF9F40',
        backgroundColor: '#FF9F40',
        tension: 0.1,
        pointBackgroundColor: '#FF9F40',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: `이완기 혈압 (${unit?.bloodPressure})`,
        data: recentData.map((overview) => parseBloodPressure(overview.bloodPressure).diastolic),
        borderColor: '#9966FF',
        backgroundColor: '#9966FF',
        tension: 0.1,
        pointBackgroundColor: '#9966FF',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const fastingBloodGlucoseData = {
    labels,
    datasets: [
      {
        label: `식전혈당 (${unit?.fastingBloodGlucose})`,
        data: recentData.map((overview) => parseFloat(overview.fastingBloodGlucose)),
        borderColor: '#FFCD56',
        backgroundColor: '#FFCD56',
        tension: 0.1,
        pointBackgroundColor: '#FFCD56',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: '#E5E5E5',
        },
      },
      x: {
        title: {
          display: true,
          text: '검진 날짜',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
        grid: {
          color: '#E5E5E5',
        },
      },
    },
  };

  const heightOptions: ChartOptions<'line'> = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        title: {
          display: true,
          text: `키 (${unit?.height})`,
          font: { size: 12, weight: 'bold' },
        },
        min: Math.min(...recentData.map((overview) => parseFloat(overview.height))) - 5,
        max: Math.max(...recentData.map((overview) => parseFloat(overview.height))) + 5,
      },
    },
  };

  const weightOptions: ChartOptions<'line'> = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        title: {
          display: true,
          text: `몸무게 (${unit?.weight})`,
          font: { size: 12, weight: 'bold' },
        },
        min: Math.min(...recentData.map((overview) => parseFloat(overview.weight))) - 5,
        max: Math.max(...recentData.map((overview) => parseFloat(overview.weight))) + 5,
      },
    },
  };

  const bmiOptions: ChartOptions<'line'> = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        title: {
          display: true,
          text: `BMI (${unit?.BMI})`,
          font: { size: 12, weight: 'bold' },
        },
        min: Math.min(...recentData.map((overview) => parseFloat(overview.BMI))) - 1,
        max: Math.max(...recentData.map((overview) => parseFloat(overview.BMI))) + 1,
      },
    },
  };

  const bloodPressureOptions: ChartOptions<'line'> = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        title: {
          display: true,
          text: `혈압 (${unit?.bloodPressure})`,
          font: { size: 12, weight: 'bold' },
        },
        min: Math.min(
          ...recentData.map((overview) => parseBloodPressure(overview.bloodPressure).diastolic),
        ) - 10,
        max: Math.max(
          ...recentData.map((overview) => parseBloodPressure(overview.bloodPressure).systolic),
        ) + 10,
      },
    },
  };

  const fastingBloodGlucoseOptions: ChartOptions<'line'> = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        title: {
          display: true,
          text: `식전혈당 (${unit?.fastingBloodGlucose})`,
          font: { size: 12, weight: 'bold' },
        },
        min: Math.min(
          ...recentData.map((overview) => parseFloat(overview.fastingBloodGlucose)),
        ) - 10,
        max: Math.max(
          ...recentData.map((overview) => parseFloat(overview.fastingBloodGlucose)),
        ) + 10,
      },
    },
  };

  return (
    <Container>
      <Title>건강검진 결과 차트 (최근 5회)</Title>
      <ChartWrapper>
        <Chart>
          <Line
            data={heightData}
            options={heightOptions}
          />
        </Chart>
        <Chart>
          <Line
            data={weightData}
            options={weightOptions}
          />
        </Chart>
        <Chart>
          <Line
            data={bmiData}
            options={bmiOptions}
          />
        </Chart>
        <Chart>
          <Line
            data={bloodPressureData}
            options={bloodPressureOptions}
          />
        </Chart>
        <Chart>
          <Line
            data={fastingBloodGlucoseData}
            options={fastingBloodGlucoseOptions}
          />
        </Chart>
      </ChartWrapper>
    </Container>
  );
}
