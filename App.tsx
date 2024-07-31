import { Router } from './src/routes/Router';
import { AuthProvider } from './src/core/context/Auth';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}