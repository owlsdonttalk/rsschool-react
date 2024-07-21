import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { selectedReducer } from '../store/selectedReducer.ts';
import GridElement from '../components/GridElement.tsx';

const mockStore = configureStore({
    reducer: {
        selected: selectedReducer,
    },
    preloadedState: {
        selected: {
            selectedValues: [],
        },
    },
});

const mockElement = { id: '1', name: 'Test Item' };

describe('GridElement', () => {
    it('should render the component with data, a checkbox, and an icon', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <GridElement element={mockElement} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('id:')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('name:')).toBeInTheDocument();
        expect(screen.getByText('Test Item')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeInTheDocument();

        const svgIcon = screen.getByTestId('details-icon');
        expect(svgIcon).toBeInTheDocument();
    });
});
