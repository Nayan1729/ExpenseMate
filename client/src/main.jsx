import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import store from "./store/store.js"
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import AuthLayout from './components/ProtectedRoute.jsx'
import InviteSignUp from './pages/InviteSignUp.jsx'
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
  },
  {
    path:'/invite',
    element:(
      <AuthLayout authentication={false}>
        <InviteSignUp />
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
