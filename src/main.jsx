import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RatingForm from './Components/RatingForm.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([

  {path:'/',
    element:<App />
  },
  
 {path:'/home',
      element:<App />
 },

{path:'/ratingform',
  element:<RatingForm />
}
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
