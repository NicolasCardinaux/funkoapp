import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CrearFunko from './components/CrearFunko';
import ListarFunkos from './components/ListarFunkos';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/crear-funko" element={<CrearFunko />} />
            <Route path="/listar-funkos" element={<ListarFunkos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
