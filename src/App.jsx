import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import BuyTicketPage from "./pages/BuyTicketPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import TicketResultPage from "./pages/TicketResultPage";
import ProfilePage from "./pages/ProfilePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AdminPage from "./pages/AdminPage";
import AdminMoviePage from "./pages/AdminMoviePage";
import AdminNewMoviePage from "./pages/AdminNewMoviePage";
import { Provider } from "react-redux";
import { PersistGate } from "./../node_modules/redux-persist/es/integration/react";
import { persistor, store } from "./redux/store";
import Test from "./pages/test";

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
    path: "/ticket-result",
    element: <TicketResultPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin-movie",
    element: <AdminMoviePage />,
  },
  {
    path: "/admin-new-movie",
    element: <AdminNewMoviePage />,
  },
  {
    path: "/order-history",
    element: <OrderHistoryPage />,
  },
  {
    path: "/buy-ticket/:id",
    element: <BuyTicketPage />,
  },
  {
    path: "/buy-ticket/:id/seat",
    element: <OrderPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
};

export default App;
