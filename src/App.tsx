import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PublicLayout from './components/Layout/PublicLayout'
import HomePage from './components/Pages/HomePage'
import AddUser from './components/Pages/AddUser'
import User from './components/Pages/User'
import { Toaster } from './components/ui/sonner'
import UserManagement from './components/Pages/UserManagement'

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
