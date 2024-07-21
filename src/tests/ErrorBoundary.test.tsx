import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';
import React from 'react';
import { describe, it, expect } from 'vitest';

const ProblematicComponent: React.FC = () => {
    throw new Error('Test error');
};

describe('Error Boundary', () => {
    it('should display the fallback UI when an error is thrown', () => {
        render(
            <ErrorBoundary>
                <ProblematicComponent />
            </ErrorBoundary>
        );

        const svgIcon = screen.getByTestId('error-boundary-icon');
        expect(svgIcon).toBeInTheDocument();
    });

    it('should render children when no error is thrown', () => {
        render(
            <ErrorBoundary>
                <div>Child Component</div>
            </ErrorBoundary>
        );

        expect(screen.getByText('Child Component')).toBeInTheDocument();
    });
});
