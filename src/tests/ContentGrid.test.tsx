import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentGrid from '../components/ContentGrid.tsx';

vi.mock('../components/GridElement.tsx', () => ({
    default: ({ element }: { element: Record<string, string> }) => (
        <div>{element.name}</div>
    )
}));

describe('ContentGrid', () => {
    it('should display "No results" when there are no items', () => {
        render(<ContentGrid items={[]} />);

        expect(screen.getByText('No results')).toBeInTheDocument();
    });

    it('should render GridElement components when there are items', () => {
        const items = [
            { id: '1', name: 'Item 1' },
            { id: '2', name: 'Item 2' }
        ];

        render(<ContentGrid items={items} />);

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
});
