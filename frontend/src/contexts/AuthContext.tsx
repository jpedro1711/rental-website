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
  const router = useRouter();

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
        }
      }
    };

    fetchData();
  }, []);

  async function signIn({ email, password }: signInData) {
    try {
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

      axios
        .get<User>('http://localhost:8080/auth/profile', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setisAuthenticated(true);
          console.log(response.data);

          const url = '/';
          router.push(url);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data.error);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    } catch (err) {
      alert('Erro de login: E-mail ou senha incorretos');
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
    alert('Logout realizado com sucesso!');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
