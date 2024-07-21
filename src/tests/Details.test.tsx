import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../views/Details.tsx';
import { store } from '../store/store.ts';
import { useGetStarWarsDetailsQuery } from '../store/starWarsApi';

interface StarWarsApiMock {
    useGetStarWarsDetailsQuery: vi.Mock;
}

vi.mock('../store/starWarsApi', async (importOriginal) => {
    const actual = (await importOriginal()) as StarWarsApiMock;
    return {
        ...actual,
        useGetStarWarsDetailsQuery: vi.fn(),
    };
});

const mockDetailedData = {
    id: '1',
    name: 'Test Star Wars Item',
    description: 'This is a test item',
};

describe('Details', () => {
    it('should render and display data', async () => {
        (useGetStarWarsDetailsQuery as vi.Mock).mockReturnValue({
            data: mockDetailedData,
            isLoading: false,
            isFetching: false,
            refetch: vi.fn(),
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/details/1']}>
                    <Routes>
                        <Route path="details/:itemId" element={<Details />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Details')).toBeInTheDocument();
            expect(screen.getByText('id:')).toBeInTheDocument();
            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('name:')).toBeInTheDocument();
            expect(screen.getByText('Test Star Wars Item')).toBeInTheDocument();
            expect(screen.getByText('description:')).toBeInTheDocument();
            expect(screen.getByText('This is a test item')).toBeInTheDocument();
        });
    });
});
