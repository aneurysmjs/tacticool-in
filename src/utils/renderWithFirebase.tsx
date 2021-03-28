import React, { ReactElement } from 'react';

import { render, RenderResult } from '@testing-library/react';

import { AuthProvider } from '~/providers/AuthProvider';

export default function renderWithFirebase(ui: ReactElement): RenderResult {
  return {
    ...render(<AuthProvider>{ui}</AuthProvider>),
  };
}
