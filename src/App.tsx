import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PublicLayout from './components/Layout/PublicLayout'
import HomePage from './components/Pages/HomePage'

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
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
