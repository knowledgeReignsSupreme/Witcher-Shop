import React from 'react';
import { colorsVariables } from '../GlobalStyles';
import LaderIcon from 'react-loader-spinner';

const Loader = ({ size, message }) => {
  return (
    <>
      {message && (
        <h3 style={{ textAlign: 'center', margin: '1rem auto', width: '100%' }}>
          {message}
        </h3>
      )}
      <LaderIcon
        style={{ textAlign: 'center', margin: '1rem auto', width: '100%' }}
        type='Oval'
        color={colorsVariables.colorMainDark}
        height={size || 40}
        width={size || 40}
      />
    </>
  );
};

export default Loader;
