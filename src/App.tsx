import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import ToastNotification from './components/ui/toast';
import { Toaster } from './components/ui/toaster';
import { InsumoProAuthProvider } from './context/insumopro-auth-context';

export default function App() {
  return (
    <InsumoProAuthProvider>
      <RouterProvider router={router} />
      <ToastNotification />
      <Toaster />
    </InsumoProAuthProvider>
  )
}
