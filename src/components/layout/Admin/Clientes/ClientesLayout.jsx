import React from 'react';
import ClientesFilter from './ClientesFilter';
import ClientesMain from './ClientesMain';

const ClientesLayout = () => {
  return (
    <>
      <ClientesMain />
      <ClientesFilter />
    </>
  );
};

export default ClientesLayout;
