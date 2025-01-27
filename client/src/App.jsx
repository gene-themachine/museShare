import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import AddReviewPage from './pages/AddReviewPage'
import ReviewPage from './pages/ReviewPage'
import ViewReviewPage from './pages/ViewReviewPage'
import UserPage from './pages/UserPage'
import OthersProfilePage from './pages/OthersProfilePage'
import ViewSpecificReview from './pages/SpecficReviews/ViewSpecificReview'



function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/add-review" element={<AddReviewPage/>} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/view/:type/:id" element={<ViewReviewPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/profile/:id" element={<UserPage />} /> {/* email for now */}
        <Route path="/profile/others/:id" element={<OthersProfilePage />} />
        <Route path="/view-review/:id" element={<ViewReviewPage />} />
        <Route path="/view-a-review/:type/:id" element={<ViewSpecificReview />} />
        
      </Route>
      
    </Routes>
  )
}

export default App
