import { createBrowserRouter, useRouteError } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Confirmation from "./Confirmation"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "compose-salad",
        loader: inventoryLoader,
        element: <ComposeSalad />
      },
      {
        path: "view-order",
        element: <ViewOrder />,
        children : [
            {
                path: "confirm/:uuid",
                element: <Confirmation />
            }
        ]
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