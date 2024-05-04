import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import LandingComponent from "./Landing";



function App() {
  return (
    <div className="App">
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/section' element={<LandingComponent/>} />
       </Routes>
    </div>
  );
}
export default App;
