import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import React from 'react';

const TestComponent: React.FC = () => {
    const context = React.useContext(ThemeContext);
    if (!context) return null;

    const { theme, toggleTheme } = context;

    return (
        <div>
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

describe('ThemeContext', () => {
    it('should provide the current theme and toggleTheme function', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Toggle Theme/i));

        expect(screen.getByText(/Current theme: dark/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Toggle Theme/i));

        expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();
    });
});
