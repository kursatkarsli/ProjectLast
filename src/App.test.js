import { act, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // to mock setInterval and clearInterval
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    })
  });

  it('renders without errors', () => {
    render(<App />);
    expect(screen.getByText('Soccer Games')).toBeInTheDocument();
  });

  it('displays current games when there are games ongoing', () => {
    render(<App />);
    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByText('Current Games')).toBeInTheDocument();
  });
});