
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Elementos para el Routing
import Navbar from "./Navbar/index";
import Home from "./pages/Home/homePage";
import Details from "./pages/details/detalle";
import Login from "./pages/login/loGin";
import MovList from "./pages/movieList/peliL";
import Register from "./pages/register/registro";

import UserContextProvider from "./context/UserContext";

function App() {
  

  return (
    <Router>
      <UserContextProvider>
      <Navbar />
      <Routes>
            <Route exact path ="/reg" element={<Register/>}/>
            <Route exact path ="/login" element={<Login/>}/>
            <Route exact path ="/" element={<Home/>}/>
            <Route exact path ="/det" element={<Details/>}/>
            <Route exact path ="/list" element={<MovList/>}/>

      </Routes>
      </UserContextProvider>
    </Router>
    
  )
}

export default App
