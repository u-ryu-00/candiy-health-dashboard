import { HTMLAttributes } from 'react';

import { useRouter } from 'next/router';

import Button from '../common/Button';

type ServiceButtonProps = HTMLAttributes<Element> & {
  path: string;
}

export default function ServiceButton({
  path, children,
}: ServiceButtonProps) {
  const router = useRouter();

  const handleClickServiceButton = () => {
    router.push(path);
  };

  return (
    <Button onClick={handleClickServiceButton}>
      {children}
    </Button>
  );
}
