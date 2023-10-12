import { createBrowserRouter, useRouteError } from "react-router-dom";
import App from './App';
import SearchForm from "./SearchForm";
import Favorites from "./Favorites";
import ViewOrder from "./ViewOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "search-form",
        element: <SearchForm />
      },
      {
        path: "favorites",
        element: <Favorites />,
        children : [
        ]
      },
      {
        path: "shopping-cart",
        element: <ViewOrder />
      }
    ],
    errorElement: <Error />
  },
]);

function Error() {
    let error = useRouteError();
    console.error(error);
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
            <h1 className="display-1 fw-bold text-white">404: Not Found</h1>
        </div>
    );
}

export default router