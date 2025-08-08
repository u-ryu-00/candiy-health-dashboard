import { render, screen } from '@testing-library/react';

import Example from './Example';

test('Example', () => {
  render(<Example />);

  screen.getByText(/Example/);
});
