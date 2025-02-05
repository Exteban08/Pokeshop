import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'flex cursor-pointer items-center justify-center rounded-md bg-blue-500 font-medium text-white transition-colors hover:opacity-80',
        {
          'dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600': !className,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
