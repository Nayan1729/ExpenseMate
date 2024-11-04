import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import store from "./store/store.js"
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import AuthLayout from './components/ProtectedRoute.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element: (
      <AuthLayout authentication={false}>
          <App />
      </AuthLayout>
      ),
  },
  {
    path: 'login',
    element:  (
      <AuthLayout authentication={false}>
          <Login />
      </AuthLayout>
      )
  },
  {
    path: 'register',
    element: (
      <AuthLayout authentication={false}>
          <SignUp />
      </AuthLayout>
      )
  },
  {
    path:'home',
    element:(
              <AuthLayout authentication>
                {" "}
                <Home />
              </AuthLayout>
            )
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
)
