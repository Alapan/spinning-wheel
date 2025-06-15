import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App  from '../src/App';
import { computeAngleToNextSegment, computeCurrentSegment, reverseUpToIndex } from '../src/utils';

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

  it('tests reverseUpToIndex function with a non-zero index', () => {
    const arr = ['A', 'B', 'C', 'D', 'E'];
    const index = 3;
    const expected = ['D', 'C', 'B', 'A', 'E'];
    expect(reverseUpToIndex(arr, index)).toEqual(expected);
  });

  it('tests reverseUpToIndex function with a zero index', () => {
    const arr = ['A', 'B', 'C', 'D', 'E'];
    const index = 0;
    const expected = ['A', 'B', 'C', 'D', 'E'];
    expect(reverseUpToIndex(arr, index)).toEqual(expected);
  });

  it('tests computeAngleToNextSegment function with array of 5 elements', () => {
    const segments = ['A', 'B', 'C', 'D', 'E'];
    const expectedAngle = 18 * (Math.PI / 180);
    expect(computeAngleToNextSegment(segments)).toBeCloseTo(expectedAngle, 0.01);
  });

  it('tests computeAngleToNextSegment function with array of 6 elements', () => {
    const segments = ['A', 'B', 'C', 'D', 'E'];
    const expectedAngle = 30 * (Math.PI / 180);
    expect(computeAngleToNextSegment(segments)).toBeCloseTo(expectedAngle, 0.01);
  });
});
