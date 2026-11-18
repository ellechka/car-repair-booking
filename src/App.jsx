import {BrowserRouter, Navigate, Route, Routes} from 'react-router';
import { useState } from 'react';
import { AuthContext } from './AuthContext';
import Home from './views/Home';
import Layout from './components/Layout';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Guest from './views/Guest';
import LoginPage from "./views/LoginPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
     <BrowserRouter>
       <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
         <Routes>
           <Route element={<Layout />}>
             <Route path="/" element={<Guest />} />
             <Route path="/guest" element={<Guest />} />
             <Route path="/home" element={<Home />} />
             <Route
               path="/profile"
               element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
             />
             <Route
               path="/upload"
               element={isAuthenticated ? <Upload /> : <Navigate to="/login" replace />}
             />
             <Route path="/single" element={<Single />} />
             <Route path="/login" element={<LoginPage />} />
           </Route>
         </Routes>
       </AuthContext.Provider>
     </BrowserRouter>
  );
};
export default App;
