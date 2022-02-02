import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home, Add } from './pages';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/add" element={<Add/>}/>
        </Routes>
        </div>
      </Router>
     
  );}
  
export default App;
