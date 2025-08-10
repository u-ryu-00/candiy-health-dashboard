import styled, { css } from 'styled-components';

import { generateId, sortOverviewListByDate } from '../../utils';

import { EVALUATION_STATUS, CheckupResultData } from '../../types';

const Container = styled.div`
  width: 100%;
  min-height: 25rem;
  max-height: 50rem;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    min-height: ${({ theme }) => theme.remToVw(25)};
    max-height: ${({ theme }) => theme.remToVw(50)};
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.remToVw(1)};
  }
`;

const Card = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.6rem;
  width: 100%;
  color: ${({ theme }) => theme.color.textDark};
  background: ${({ theme }) => theme.color.backgroundLight};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.remToVw(1.6)};
    gap: ${({ theme }) => theme.remToVw(1)};
    padding: ${({ theme }) => theme.remToVw(1.6)};
  }
`;

const CheckupDate = styled.span`
  font-weight: 700;
  display: flex;
  justify-content: end;
  color: ${({ theme }) => theme.color.textActive};
`;

const ResultList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    gap: ${({ theme }) => theme.remToVw(1)};
  }
`;

const ResultItem = styled.div`
  display: flex;
  gap: .8rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    gap: ${({ theme }) => theme.remToVw(0.8)};
  }
`;

const ResultLabel = styled.dt`
  font-weight: 700;
`;

const ResultValue = styled.dd`
  font-weight: 500;

  span {
    font-size: 1.4rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    span {
      font-size: ${({ theme }) => theme.remToVw(1.4)};
    }
  }
`;

const Evaluation = styled.div`
  display: flex;
  justify-content: end;
`;

type StatusProps = {
  status: string;
}

const Status = styled.span<StatusProps>`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.color.text};

  ${({ status }) => status === EVALUATION_STATUS.normal && css`
    background: ${({ theme }) => theme.color.backgroundNormal};
  `}

  ${({ status }) => status === EVALUATION_STATUS.warning && css`
    background: ${({ theme }) => theme.color.backgroundWarning};
  `}

  ${({ status }) => status === EVALUATION_STATUS.danger && css`
    background: ${({ theme }) => theme.color.backgroundError};
  `}

  ${({ status }) => status === EVALUATION_STATUS.other && css`
    background: ${({ theme }) => theme.color.background};
  `}

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.remToVw(1.4)};
    width: ${({ theme }) => theme.remToVw(4.8)};
    height: ${({ theme }) => theme.remToVw(4.8)};
  }
`;

type ResultDashboardProps = {
  checkupResultData: CheckupResultData;
};

export default function ResultDashboard({ checkupResultData }: ResultDashboardProps) {
  const sortedOverviewList = sortOverviewListByDate(checkupResultData.overviewList);
  const unit = checkupResultData.referenceList.find((reference) => reference.refType === '단위');

  const getEvaluationStatus = (evaluation: string) => {
    if (evaluation === '정A') {
      return EVALUATION_STATUS.normal;
    }

    if (evaluation === '정B' || evaluation === '주의') {
      return EVALUATION_STATUS.warning;
    }

    if (evaluation === '의심' || evaluation === '고∙당' || evaluation === '유질') {
      return EVALUATION_STATUS.danger;
    }

    return EVALUATION_STATUS.other;
  };

  return (
    <Container>
      <Wrapper>
        {sortedOverviewList.map((overview) => (
          <Card key={generateId()}>
            <CheckupDate>{overview.checkupDate}</CheckupDate>
            <ResultList>
              <ResultItem>
                <ResultLabel>키/몸무게</ResultLabel>
                <ResultValue>
                  {overview.height}
                  {' '}
                  <span>{unit?.height}</span>
                  {' / '}
                  {overview.weight}
                  <span>{unit?.weight}</span>
                </ResultValue>
              </ResultItem>
              <ResultItem>
                <ResultLabel>BMI 수치</ResultLabel>
                <ResultValue>
                  {overview.BMI}
                  {' '}
                  <span>{unit?.BMI}</span>
                </ResultValue>
              </ResultItem>
              <ResultItem>
                <ResultLabel>혈압 (수축기/이완기)</ResultLabel>
                <ResultValue>
                  {overview.bloodPressure}
                  {' '}
                  <span>{unit?.bloodPressure}</span>
                </ResultValue>
              </ResultItem>
              <ResultItem>
                <ResultLabel>식전혈당</ResultLabel>
                <ResultValue>
                  {overview.fastingBloodGlucose}
                  {' '}
                  <span>{unit?.fastingBloodGlucose}</span>
                </ResultValue>
              </ResultItem>
            </ResultList>
            <Evaluation>
              <Status status={getEvaluationStatus(overview.evaluation)}>
                {getEvaluationStatus(overview.evaluation)}
              </Status>
            </Evaluation>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
}
