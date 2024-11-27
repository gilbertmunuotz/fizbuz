import Home from './pages/Home';
import Login from "./pages/Login";
import Settings from './pages/Settings';
import Register from "./pages/Register";
import NotFound from './components/NotFound';
import Transaction from './pages/Transaction';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from "react-toastify";
import { PrivateRoute } from './components/PrivateRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: "/", element: (<PrivateRoute><Home />,</PrivateRoute>), errorElement: <NotFound /> },
  { path: "/login", element: <Login />, },
  { path: "/register", element: <Register />, },
  { path: "/transactions", element: (<PrivateRoute> <Transaction /></PrivateRoute>), errorElement: <NotFound /> },
  { path: "/settings", element: (<PrivateRoute> <Settings /></PrivateRoute>), errorElement: <NotFound /> }
]);

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <RouterProvider router={router} />
    </>
  );
}