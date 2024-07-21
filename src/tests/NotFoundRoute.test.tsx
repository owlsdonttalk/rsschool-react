import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import NotFound from "../views/NotFound.tsx";

describe('404 Page', () => {
    it('should display the 404 page when accessing a non-existent route', () => {

        const router = createMemoryRouter([
            { path: '*', element: <NotFound /> },
        ]);

        render(
            <RouterProvider router={router} />
        );

        window.history.pushState({}, '', '/non-existent-route');

        expect(screen.getByText('404 - Page not found')).toBeInTheDocument();
    });
});
