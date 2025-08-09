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
`;

const ConfirmButton = styled(Button)`
  padding: 1.6rem 2.4rem;
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
