import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Inicio from './pages/Inicio';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/inicio" element={ <ProtectedRoute> <Inicio /> </ProtectedRoute> }/>
      <Route path="/perfil" element={ <ProtectedRoute> <Perfil /> </ProtectedRoute> }/>
      <Route path="/editarperfil" element={ <ProtectedRoute> <EditarPerfil /> </ProtectedRoute> }/> 
    </Routes>
  );
};

export default App;
