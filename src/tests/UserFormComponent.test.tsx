import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserFormComponent from '../components/FormComponents/UserFormComponent';

describe('UserFormComponent', () => {
  it('renders correctly', async () => {
    render(
      <UserFormComponent onFinish={() => {}} formName="Test Form" />
    );
  });
});
