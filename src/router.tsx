import { createBrowserRouter } from 'react-router-dom';
import MainPage from './views/MainPage.tsx';
import NotFound from './views/NotFound.tsx';
import Details from './views/Details.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'page/:pageNumber',
        errorElement: <NotFound />,
        children: [
          {
            path: 'details/:itemId',
            errorElement: <NotFound />,
          },
        ],
      },
      {
        path: 'details/:itemId',
        element: <Details />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default router;
