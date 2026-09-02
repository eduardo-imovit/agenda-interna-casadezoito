import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Login from './pages/Login'
import RedefinirSenha from './pages/RedefinirSenha'
import Home from './pages/Home'
import Agenda from './pages/Agenda'
import MinhasReservas from './pages/MinhasReservas'
import Configuracoes from './pages/Configuracoes'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import ComoUsar from './pages/ComoUsar'
import VisaoGeral from './pages/manual/VisaoGeral'
import Recepcao from './pages/manual/Recepcao'
import Copa from './pages/manual/Copa'
import Limpeza from './pages/manual/Limpeza'
import Valet from './pages/manual/Valet'
import Convivencia from './pages/manual/Convivencia'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/agenda" element={<ProtectedRoute><Agenda /></ProtectedRoute>} />
        <Route path="/minhas-reservas" element={<ProtectedRoute><MinhasReservas /></ProtectedRoute>} />
        <Route path="/manual" element={<ProtectedRoute><VisaoGeral /></ProtectedRoute>} />
        <Route path="/manual/recepcao" element={<ProtectedRoute><Recepcao /></ProtectedRoute>} />
        <Route path="/manual/copa" element={<ProtectedRoute><Copa /></ProtectedRoute>} />
        <Route path="/manual/limpeza" element={<ProtectedRoute><Limpeza /></ProtectedRoute>} />
        <Route path="/manual/valet" element={<ProtectedRoute><Valet /></ProtectedRoute>} />
        <Route path="/manual/convivencia" element={<ProtectedRoute><Convivencia /></ProtectedRoute>} />
        <Route path="/como-usar" element={<ProtectedRoute><ComoUsar /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute somenteAdmin><Configuracoes /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute somenteAdmin><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
