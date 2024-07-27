import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.jsx";
import Books from "./pages/Books.jsx";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./pages/Home.jsx";
import Book from "./pages/Book.jsx";

import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Dashboard from "./pages/Dashboard.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Signin />,
      },
      {
        path: "/Books",
        element: (
          <PrivateRoute>
            <Books />
          </PrivateRoute>
        ),
      },

      {
        path: "/Dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: <Book />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={route} />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
