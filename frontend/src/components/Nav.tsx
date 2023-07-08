'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import '../app/styles.css';
import { AuthContext } from '@/contexts/AuthContext';

const Nav = () => {
  const [visible, setVisible] = useState(false);
  const Auth = useContext(AuthContext);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  function handleSignOut() {
    Auth.signOut();
  }

  return (
    <div className="rounded">
      <header className="flex justify-between items-center bg-orange-400 px-4 py-8">
        <a href="/" className="text-2xl font-semibold text-orange-950">
          Rental
        </a>
        <div className="lg:hidden">
          <MenuOutlined className="text-white text-2xl" onClick={showDrawer} />
        </div>
        <nav className="hidden lg:flex justify-between items-center gap-4">
          {Auth.user ? (
            <button
              onClick={handleSignOut}
              className="text-orange-950 rounded px-8 py-2 bg-orange-50 hover:bg-orange-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <a
                href="/cadastro"
                className="text-orange-950 rounded px-8 py-2 bg-orange-50 hover:bg-orange-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                Cadastro
              </a>
              <a
                href="/login"
                className="text-orange-950 rounded px-8 py-2 bg-orange-50 hover:bg-orange-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                Login
              </a>
            </>
          )}
          <a
            href="/frota"
            className="text-orange-950 rounded px-8 py-2 bg-orange-50 hover:bg-orange-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            Nossa Frota
          </a>
          <a
            href="/reservas"
            className="text-orange-950 rounded px-8 py-2 bg-orange-50 hover:bg-orange-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            Minhas Reservas
          </a>
        </nav>
        <Drawer placement="right" onClose={onClose} open={visible}>
          <div className="flex flex-col items-center">
            {Auth.user ? (
              <button
                onClick={handleSignOut}
                className="w-full mb-4 text-orange-950 hover:text-orange-700 text-2xl text-left"
              >
                Logout
              </button>
            ) : (
              <>
                <a
                  href="/cadastro"
                  onClick={onClose}
                  className="w-full mb-4 text-orange-950 hover:text-orange-700 text-2xl"
                >
                  Cadastro
                </a>
                <a
                  href="/login"
                  onClick={onClose}
                  className="w-full mb-4 text-orange-950 hover:text-orange-700 text-2xl"
                >
                  Login
                </a>
              </>
            )}
            <a
              href="/frota"
              onClick={onClose}
              className="w-full mb-4 text-orange-950 hover:text-orange-700 text-2xl"
            >
              Nossa Frota
            </a>
            <a
              href="/reservas"
              onClick={onClose}
              className="w-full mb-4 text-orange-950 hover:text-orange-700 text-2xl"
            >
              Minhas Reservas
            </a>
          </div>
        </Drawer>
      </header>
    </div>
  );
};

export default Nav;
