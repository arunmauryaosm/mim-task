import './App.css';
import Home from './components/Home';
import Index from './components/Index';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div>
          <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index/>}/>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
