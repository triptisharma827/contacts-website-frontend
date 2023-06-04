import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ParticlesBackground from "./particles";


import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
function App() {
  return (
    <div>
    <ParticlesBackground /> 
    <Router >
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path='/Dashboard' element={<Dashboard/>} />
      </Routes>
     
    </Router>
    <p className='footer'>copyright@ <a href='https://linktr.ee/triptisharmaa'>Tripti Sharma</a></p>
    </div>
  );
}
export default App;