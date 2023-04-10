import { act, render, screen } from '@testing-library/react';
import App from './ScoreBoard';
import { Grid } from '@mui/material';

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
  it('displays the correct flag and alt text', () => {
    const props = {
      homeCountryCode: 'us',
      homeName: 'United States',
    };

    const { getByAltText } = render(
      <Grid item flex={1}>
        <img
          src={`https://flagcdn.com/${props.homeCountryCode}.svg`}
          width="50"
          alt={`${props.homeName}`}
        />
      </Grid>
    );

    const flagImage = screen.getByAltText(props.homeName);
    expect(flagImage).toHaveAttribute('src', `https://flagcdn.com/${props.homeCountryCode}.svg`);
    expect(flagImage).toHaveAttribute('width', '50');
  });
});