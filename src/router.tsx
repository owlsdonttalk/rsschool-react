import { createBrowserRouter } from 'react-router-dom';
import MainPage from './views/MainPage.tsx';
import NotFound from './views/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'page/:pageNumber',
        element: <MainPage />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default router;
