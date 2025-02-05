import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrearFunko from './components/CrearFunko';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrearFunko />} />
      </Routes>
    </Router>
  );
}

export default App;
