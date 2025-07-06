const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    socket.auth = { token };
    socket.connect();

    socket.on('connect', () => console.log('✅ Conectado al socket con ID:', socket.id));
    socket.on('connect_error', err => console.error('❌ Error al conectar socket:', err.message));

    return () => socket.disconnect();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/inicio" element={<ProtectedRoute><Inicio /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
      <Route path="/editarperfil" element={<ProtectedRoute><EditarPerfil /></ProtectedRoute>} />
      <Route path="/usuario/:username" element={<ProtectedRoute><PerfilUsuario /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
    </Routes>
  );
};

export default App;