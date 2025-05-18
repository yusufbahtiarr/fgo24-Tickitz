import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import BuyTicketPage from "./pages/BuyTicketPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/movie",
    element: <MoviePage />,
  },
  {
    path: "/buy-ticket",
    element: <BuyTicketPage />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
