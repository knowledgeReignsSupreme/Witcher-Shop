import React from 'react';
import { colorsVariables } from '../GlobalStyles';
import LaderIcon from 'react-loader-spinner';

const Loader = ({ size }) => {
  return (
    <LaderIcon
      style={{ textAlign: 'center', margin: '1rem auto', width: '100%' }}
      type='Oval'
      color={colorsVariables.colorMainDark}
      height={size || 40}
      width={size || 40}
    />
  );
};

export default Loader;
