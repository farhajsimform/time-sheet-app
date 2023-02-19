import { lazy, Suspense } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Spinner } from 'react-bootstrap'
const LoginPage = lazy(() => import('pages/Login'))
const CreateRequestPage = lazy(() => import('pages/CreateRequest'))
const TimeSheetPage = lazy(() => import('pages/TimeSheet'))
const AdminPage = lazy(() => import('pages/Admin'))
import { ProtectedRoute } from 'components/molecules/ProtectedRoute'
import { PublicRoute } from 'components/molecules/PublicRoute'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className='loader'>
            <Spinner animation='grow' role='status'></Spinner>
            <span>Loading...</span>
          </div>
        }
      >
        <Router>
          <Routes>
            <Route path='/' element={<PublicRoute />}>
              <Route index={true} element={<LoginPage />} />
            </Route>
            <Route
              path='/create-request'
              element={
                <ProtectedRoute>
                  <CreateRequestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/timesheet'
              element={
                <ProtectedRoute>
                  <TimeSheetPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/admin'
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </Suspense>
      <ToastContainer />
    </div>
  )
}

export default App
