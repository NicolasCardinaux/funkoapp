import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrearFunko from './components/CrearFunko';
import Sidebar from './components/Sidebar';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/crear-funko" element={<CrearFunko />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
