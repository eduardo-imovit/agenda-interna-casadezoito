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
import Manual from './pages/Manual'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/agenda" element={<ProtectedRoute><Agenda /></ProtectedRoute>} />
        <Route path="/minhas-reservas" element={<ProtectedRoute><MinhasReservas /></ProtectedRoute>} />
        <Route path="/manual" element={<ProtectedRoute><Manual /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute somenteAdmin><Configuracoes /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute somenteAdmin><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
