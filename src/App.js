import './App.css';
import Gallery from './components/Gallery';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/gallery/:camera' element={<Gallery/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
