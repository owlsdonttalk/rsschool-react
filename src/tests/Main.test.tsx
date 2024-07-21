import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import {store} from "../store/store.ts";
import {ThemeProvider} from "../context/ThemeContext.tsx";
import router from "../router.tsx";

describe('App', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Provider store={store}>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </Provider>
        );

        expect(container).toBeInTheDocument();
    });
});
