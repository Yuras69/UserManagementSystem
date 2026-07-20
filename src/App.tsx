import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PublicLayout from './components/Layout/PublicLayout'
import HomePage from './components/Pages/HomePage'
import AddUser from './components/Pages/AddUser'
import User from './components/Pages/User'
import { Toaster } from './components/ui/sonner'
import UserManagement from './components/Pages/UserManagement'
import Reports from './components/Pages/Reports'
import Roles from './components/Pages/Roles'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/add-user',
          element: <AddUser />,
        },
        {
          path: '/user',
          element: <User />,
        },
        {
          path: '/usermanagement',
          element: <UserManagement />,
        },
        {
          path: '/reports',
          element: <Reports />,
        },
        {
          path: '/roles',
          element: <Roles />,
        },
      ],
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  )
}

export default App
