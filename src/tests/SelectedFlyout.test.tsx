import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import SelectedFlyout from '../components/SelectedFlyout';
import { toggleSelected } from '../store/selectedReducer';

test('should render the element correct text when there are selected items', () => {
    store.dispatch(toggleSelected({ id: '1', name: 'Дглу' }));

    render(
        <Provider store={store}>
            <SelectedFlyout />
        </Provider>
    );

    expect(screen.getByText(/Selected:/i)).toBeInTheDocument();
});
