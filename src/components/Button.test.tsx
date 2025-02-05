import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  it('renders the button with children', () => {
    render(<Button>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  it('applies custom className when provided', () => {
    render(<Button className="custom-class">Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
