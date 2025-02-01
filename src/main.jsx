import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import RatingForm from './Components/RatingForm.jsx'
import BookDetail from './Components/BookDetail.jsx'

const router = createBrowserRouter([
  {
    path: '/ratingform',
    element: <RatingForm />
  },
  {
    path: '/home',
    element: <App />,
  },
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/books/:id',
    element: <BookDetail />,
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)