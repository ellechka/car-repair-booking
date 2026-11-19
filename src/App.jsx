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
import Booking from './views/menu/booking';
import Services from './views/menu/services';
import PriceList from './views/menu/pricelist';
import Shop from './views/menu/shop';
import FAQ from './views/menu/faq';
import Contact from './views/menu/contact'; 

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
             <Route path="/booking" element={<Booking />} />
             <Route path="/services" element={<Services />} />
             <Route path="/price-list" element={<PriceList />} />
             <Route path="/shop" element={<Shop />} />
             <Route path="/faq" element={<FAQ />} />
             <Route path="/contact" element={<Contact />} />
           </Route>
         </Routes>
       </AuthContext.Provider>
     </BrowserRouter>
  );
};
export default App;
