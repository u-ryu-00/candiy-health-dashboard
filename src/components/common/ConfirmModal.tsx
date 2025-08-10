import Modal from 'react-modal';

import styled from 'styled-components';

import Title from './Title';
import Button from './Button';

const Container = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 1.6rem;
  width: 90%;
  max-width: 35rem;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.color.background};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    gap: ${({ theme }) => theme.remToVw(2.4)};
    padding: ${({ theme }) => theme.remToVw(1.6)};
    max-width: ${({ theme }) => theme.remToVw(35)};
    border-radius: ${({ theme }) => theme.remToVw(0.8)};
  }
`;

const ConfirmButton = styled(Button)`
  padding: 1.6rem 2.4rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: ${({ theme }) => theme.remToVw(1.6)} ${({ theme }) => theme.remToVw(2.4)};
  }
`;

type ConfirmModalProps = {
  show: boolean;
  title: string;
  onClose: () => void;
}

export default function ConfirmModal({
  show, title, onClose,
}: ConfirmModalProps) {
  return (
    <Container
      isOpen={show}
      onRequestClose={onClose}
      preventScroll
    >
      <Title>{title}</Title>
      <ConfirmButton
        onClick={onClose}
        type="button"
      >
        확인
      </ConfirmButton>
    </Container>
  );
}
