import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App  from '../src/App';
import { computeCurrentSegment } from '../src/utils';

jest.mock('js-confetti', () => {
  return jest.fn().mockImplementation(() => {
    return {
      addConfetti: jest.fn(),
    }
  });
});

describe('App.tsx', () => {
  it('renders the wheel and button', () => {
    render(<App />);
    expect(screen.getByText('Spin the wheel to find a winner!')).toBeInTheDocument();
    expect(screen.getByTestId('wheelCanvas')).toBeInTheDocument();
    expect(screen.getByTestId('buttonCanvas')).toBeInTheDocument();
  });

  it('renders the "Spinning..." text when the wheel is spinning', async () => {
    render(<App />);
    await userEvent.click(screen.getByTestId('buttonCanvas'));
    expect(screen.getByText('Spinning...')).toBeInTheDocument();
  });

  it('tests computeCurrentSegment function with 5 segments', () => {
    const segments = ['A', 'B', 'C', 'D', 'E'];
    const angle = 135 * (Math.PI / 180);
    expect(computeCurrentSegment(angle, segments)).toBe('B');
  });

  it('tests computeCurrentSegment function with 6 segments', () => {
    const segments = ['A', 'B', 'C', 'D', 'E', 'F'];
    const angle = 210 * (Math.PI / 180);
    expect(computeCurrentSegment(angle, segments)).toBe('A');
  });
});
