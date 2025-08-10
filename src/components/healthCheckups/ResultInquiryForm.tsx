/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import styled, { css } from 'styled-components';

import useModal from '../../hooks/useModal';

import { requestAuth, fetchCheckupResult } from '../../services/ClientApiService';

import useCheckupResultStore from '../../stores/checkupResult';

import { generateId } from '../../utils';
import { HealthCheckupSchema } from '../../utils/formValidationSchemas';

import type {
  ResultInquiryForm, AuthPayload, CheckupResultPayload,
} from '../../types';

import Modal from '../common/ConfirmModal';
import Button from '../common/Button';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem;
  width: 100%;
  max-width: 50rem;
  border-radius: .8rem;
  background: ${({ theme }) => theme.color.backgroundLight};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: .8rem;
  width: 100%;
  height: 9rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1;
  color: ${({ theme }) => theme.color.textDark};
`;

type InputProps = {
  error: boolean;
}

const Input = styled.input<InputProps>`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1;
  padding: 1.1rem 1.6rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: .8rem;
  outline: none;
  color: ${({ theme }) => theme.color.textDark};

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.borderActive};
  }

  ${({ error }) => error && css`
    border: 1px solid ${({ theme }) => theme.color.borderError};

    &:focus {
      border: 1px solid ${({ theme }) => theme.color.borderError};
    }
  `}
`;

type SelectProps = {
  error: boolean;
}

const Select = styled.select<SelectProps>`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1;
  padding: 1.1rem 1.6rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: .8rem;
  outline: none;
  color: ${({ theme }) => theme.color.textDark};

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.borderActive};
  }

  ${({ error }) => error && css`
    border: 1px solid ${({ theme }) => theme.color.borderError};

    &:focus {
      border: 1px solid ${({ theme }) => theme.color.borderError};
    }
  `}
`;

const ErrorMessage = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1;
  color: ${({ theme }) => theme.color.textError};
`;

const Message = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  color: ${({ theme }) => theme.color.textActive};
`;

const ActionButton = styled(Button)`
  padding: 1.6rem 2.4rem;
`;

export default function ResultInquiryForm() {
  const [authPayload, setAuthPayload] = useState<AuthPayload | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [multiFactorInfo, setMultiFactorInfo] = useState(null);

  const router = useRouter();

  const {
    isModalOpen,
    modalTitle,
    openModal,
    closeModal,
  } = useModal();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<ResultInquiryForm>({
    resolver: zodResolver(HealthCheckupSchema),
  });

  const setCheckupResult = useCheckupResultStore((state) => state.setResultData);

  const onSubmit = async (data: ResultInquiryForm) => {
    try {
      setIsAuthenticating(true);

      const authPayload: AuthPayload = {
        id: generateId(),
        ...data,
        inquiryType: '0',
      };

      const auth = await requestAuth(authPayload);

      setAuthPayload(authPayload);
      setMultiFactorInfo(auth.data);
    } catch (error) {
      openModal('인증 요청 실패');
    }

    setIsAuthenticating(false);
  };

  const handleClickConfirmButton = async () => {
    if (!multiFactorInfo || !authPayload) {
      return;
    }

    try {
      setIsAuthenticating(true);

      const checkupResultPayload: CheckupResultPayload = {
        ...authPayload,
        isContinue: '1',
        multiFactorInfo,
      };

      const checkupResult = await fetchCheckupResult(checkupResultPayload);

      if (checkupResult?.status !== 'success') {
        throw new Error('2차 요청 실패');
      }

      setCheckupResult(checkupResult.data);

      router.push('/health-checkups/result');
    } catch (error) {
      openModal('건강검진 결과 조회 실패');
    }

    setIsAuthenticating(false);
  };

  const getConfirmButtonText = () => {
    if (isAuthenticating) {
      return multiFactorInfo ? '건강검진결과 조회 중...' : '인증 처리 중...';
    }

    if (!multiFactorInfo) {
      return '인증 대기 중';
    }

    return '인증 완료';
  };

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label htmlFor="legalName">이름 *</Label>
          <Input
            id="legalName"
            placeholder="홍길동"
            error={!!errors.legalName}
            {...register('legalName')}
          />
          {errors.legalName && (
            <ErrorMessage>{errors.legalName.message}</ErrorMessage>
          )}
        </Field>
        <Field>
          <Label htmlFor="birthdate">생년월일 *</Label>
          <Input
            id="birthdate"
            placeholder="YYYYMMDD"
            error={!!errors.birthdate}
            {...register('birthdate')}
          />
          {errors.birthdate && (
            <ErrorMessage>{errors.birthdate.message}</ErrorMessage>
          )}
        </Field>
        <Field>
          <Label htmlFor="phoneNo">전화번호(핸드폰) *</Label>
          <Input
            id="phoneNo"
            placeholder="숫자만 입력"
            error={!!errors.phoneNo}
            {...register('phoneNo')}
          />
          {errors.phoneNo && (
            <ErrorMessage>{errors.phoneNo.message}</ErrorMessage>
          )}
        </Field>
        <Field>
          <Label htmlFor="telecom">통신사 *</Label>
          <Select
            id="telecom"
            error={!!errors.telecom}
            {...register('telecom')}
          >
            <option value="">통신사를 선택해주세요</option>
            <option value="0">SKT(SKT알뜰폰)</option>
            <option value="1">KT(KT알뜰폰)</option>
            <option value="2">LG U+(LG U+알뜰폰)</option>
          </Select>
          {errors.telecom && (
            <ErrorMessage>{errors.telecom.message}</ErrorMessage>
          )}
        </Field>
        <Field>
          <Label htmlFor="loginTypeLevel">간편인증 *</Label>
          <Select
            id="loginTypeLevel"
            error={!!errors.loginTypeLevel}
            {...register('loginTypeLevel')}
          >
            <option value="">간편인증 방식을 선택해주세요</option>
            <option value="1">카카오톡</option>
            <option value="3">삼성패스</option>
            <option value="4">국민은행(국민인증서)</option>
            <option value="5">통신사(PASS)</option>
            <option value="6">네이버</option>
            <option value="7">신한은행(신한인증서)</option>
            <option value="8">토스</option>
            <option value="9">뱅크샐러드</option>
            <option value="10">하나은행(하나인증서)</option>
            <option value="11">NH모바일인증서</option>
          </Select>
          {errors.loginTypeLevel && (
            <ErrorMessage>{errors.loginTypeLevel.message}</ErrorMessage>
          )}
        </Field>
        <Field>
          <Label htmlFor="startDate">조회 시작 연도 *</Label>
          <Input
            id="startDate"
            placeholder="YYYY"
            error={!!errors.startDate}
            {...register('startDate')}
          />
          {errors.startDate && (
            <ErrorMessage>{errors.startDate.message}</ErrorMessage>
          )}
        </Field>
        <Field>
          <Label htmlFor="endDate">조회 종료 연도 *</Label>
          <Input
            id="endDate"
            placeholder="YYYY"
            error={!!errors.endDate}
            {...register('endDate')}
          />
          {errors.endDate && (
            <ErrorMessage>{errors.endDate.message}</ErrorMessage>
          )}
        </Field>
        <ActionButton
          type="submit"
          disabled={isAuthenticating}
        >
          간편인증 요청
        </ActionButton>
        <ActionButton
          onClick={handleClickConfirmButton}
          disabled={!multiFactorInfo || isAuthenticating}
        >
          {getConfirmButtonText()}
        </ActionButton>
        {multiFactorInfo && (
          <Message>
            간편 인증을 완료하신 후 위의 &quot;인증 완료&quot; 버튼을 눌러주세요.
          </Message>
        )}
      </Container>
      <Modal
        show={isModalOpen}
        title={modalTitle}
        onClose={closeModal}
      />
    </>
  );
}
