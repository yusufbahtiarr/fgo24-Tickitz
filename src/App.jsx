import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import BuyTicketPage from "./pages/BuyTicketPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/movies",
    element: <MoviePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/buy-ticket/:id",
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
