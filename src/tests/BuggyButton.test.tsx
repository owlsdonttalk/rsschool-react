import { render, screen, fireEvent } from '@testing-library/react';
import BuggyButton from '../components/BuggyButton';

test('renders BuggyButton and clicks it', () => {
  render(<BuggyButton />);

  const buttonElement = screen.getByRole('button');

  expect(() => {
    fireEvent.click(buttonElement);
  }).toThrow('I crashed!');
});
