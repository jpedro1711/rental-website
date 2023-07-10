'use client';

import { createContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import axios from 'axios';
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

interface Props {
  children?: ReactNode;
}

type User = {
  userId: string;
  email: string;
  roles: string;
  reservations: [];
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: signInData) => void;
  signOut: () => void;
  carregando: boolean;
};

type signInData = {
  email: string;
  password: string;
};

interface Response {
  token: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  const closeModal = () => {
    setShowModal(false);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { rentalAuthToken: token } = parseCookies();
      if (token) {
        try {
          const res = await axios.get('http://localhost:8080/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('User profile:', res.data);
          setUser(res.data);
          setisAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setisAuthenticated(false); // Define como não autenticado em caso de erro
        }
      } else {
        setisAuthenticated(false); // Define como não autenticado se o token não estiver presente
      }
      setCarregando(false);
    };

    fetchData();
  }, []);

  async function signIn({ email, password }: signInData) {
    try {
      setCarregando(true);
      const { data } = await axios.post<Response>(
        'http://localhost:8080/auth/login',
        {
          email: email,
          password: password,
        }
      );
      console.log(data);
      setCookie(undefined, 'rentalAuthToken', data.token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      const response = await axios.get<User>(
        'http://localhost:8080/auth/profile',
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      setUser(response.data);
      setisAuthenticated(true);
      console.log(response.data);
      setCarregando(false);

      router.push('/');
    } catch (err) {
      setShowModal(true);
    }
  }

  function signOut() {
    setCookie(undefined, 'rentalAuthToken', '', {
      maxAge: -1, // Define o tempo de vida do cookie para negativo, removendo-o
    });

    setUser(null);
    setisAuthenticated(false);

    const url = '/';
    router.push(url);
    setShowLogoutModal(true);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, carregando }}
    >
      {children}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-lg relative">
            <h2 className="text-xl font-bold mb-4">Erro de login</h2>
            <p>E-mail ou senha inválidos</p>
            <button
              type="button"
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-lg relative">
            <h2 className="text-xl mb-4">Logout realizado com sucesso</h2>
            <button
              type="button"
              onClick={closeLogoutModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
