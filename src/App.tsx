import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Routes'

function App() {

  return (
    <Suspense fallback={null}>
      <RouterProvider router={router}/>
    </Suspense>
  )
}

export default App
