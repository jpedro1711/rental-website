import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const LinkToFrota = () => {
  return (
    <div>
      <div className=" rounded">
        <header className="flex justify-between items-center bg-orange-400 px-4 py-8">
          <a href="/frota" className="text-2xl font-semibold flex items-center">
            <IoIosArrowBack />
          </a>
        </header>
      </div>
    </div>
  );
};

export default LinkToFrota;
