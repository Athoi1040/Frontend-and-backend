



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; 
import SignUp from "./SignUp"; 
import SignIn from "./SignIn";
import DonationForm from "./DonationForm";
import FoodCategory from "./FoodCategory";
import ClothCategory from "./ClothCategory";
import Dashboard from "./Dashboard";  
import ProtectedRoute from "./ProtectedRoute";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/donate" element={<DonationForm />} />
        <Route path="/food-donation" element={<FoodCategory />} />
        <Route path="/cloth-donation" element={<ClothCategory />} />
        

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;


/*import { Router, RouterProvider } from "react-router-dom";
import "./App.css"
import router from "./Route";
import ProtectedRoute from './ProtectedRoute';
function App() {
  return (
    <>

     <RouterProvider router={router} />
    
    </>


  );
}


export default App;*/