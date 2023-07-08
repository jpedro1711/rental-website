import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';

const NavFrota = () => {
  return (
    <div>
      <div className=" rounded">
        <header className="flex justify-between items-center bg-orange-500 px-4 py-8">
          <a href="/" className="text-2xl font-semibold flex items-center">
            <AiOutlineHome className="mr-2" />
          </a>
        </header>
      </div>
    </div>
  );
};

export default NavFrota;
