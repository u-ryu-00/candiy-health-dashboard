import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/testHelpers';

import ServiceButton from './ServiceButton';

const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('ServiceButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders service button and listens for button click event', () => {
    render((
      <ServiceButton path="/health-checkups">
        건강검진결과
      </ServiceButton>
    ));

    fireEvent.click(screen.getByText('건강검진결과'));

    expect(push).toHaveBeenCalledWith('/health-checkups');
  });
});
