import {BrowserRouter, Route, Routes} from 'react-router';
import Home from './views/Home';
import Layout from './components/Layout';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Guest from './views/Guest';

const App = () => {

  return (
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Guest />} />
         <Route path="/guest" element={<Guest />} />
         <Route element={<Layout />}>
           <Route path="/home" element={<Home />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/upload" element={<Upload />} />
           <Route path="/single" element={<Single />} />
         </Route>
       </Routes>
     </BrowserRouter>
  );
};
export default App;
