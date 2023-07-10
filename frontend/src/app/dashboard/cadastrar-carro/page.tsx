import { AuthProvider } from '@/contexts/AuthContext';
import CadastrarCarro from './CadastrarCarro';

const page = () => {
  return (
    <div>
      <AuthProvider>
        <CadastrarCarro />
      </AuthProvider>
    </div>
  );
};

export default page;
