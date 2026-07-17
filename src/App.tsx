import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PublicLayout from './components/Layout/PublicLayout'
import HomePage from './components/Pages/HomePage'
import AddUser from './components/Pages/AddUser'

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
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
