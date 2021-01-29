import React from 'react';
import { colorsVariables } from '../GlobalStyles';
import LaderIcon from 'react-loader-spinner';

const Loader = ({ size }) => {
  return (
    <LaderIcon
      style={{ textAlign: 'center', margin: 'auto' }}
      type='Oval'
      color={colorsVariables.colorMainDark}
      height={size}
      width={size}
    />
  );
};

export default Loader;
