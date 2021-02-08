import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../Redux/Cart/actions';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { GlobalPageInit, StyledForm, colorsVariables } from '../GlobalStyles';
import shippingCountries from './shippingCountries';
import Button from '../Common/Button';
import Input from '../Common/Input';
import OrderStages from '../Common/OrderStages';

const Shipping = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');

  const fullAddress = {
    address,
    city,
    country,
    postalCode,
  };

  const isValidInput = () => {
    if (
      address.trim().length >= 2 &&
      city.trim().length >= 2 &&
      country.trim().length >= 2 &&
      postalCode.trim().length >= 4 &&
      postalCode.trim().length < 8
    ) {
      return true;
    } else {
      return false;
    }
  };

  const formValidator = useCallback(() => {
    if (address.trim().length <= 2 && address.trim().length >= 1) {
      setAddressError('Please insert a valid address');
    } else {
      setAddressError(false);
    }
    if (city.trim().length <= 2 && city.trim().length >= 1) {
      setCityError('Please insert a valid city');
    } else {
      setCityError(false);
    }
    if (
      (postalCode.trim().length <= 4 && postalCode.trim().length >= 1) ||
      (postalCode.trim().length >= 8 && postalCode.trim().length >= 1)
    ) {
      setPostalCodeError('Please insert a valid postal code');
    } else {
      setPostalCodeError(false);
    }
  }, [address, city, postalCode]);

  const saveAddressHandler = (e) => {
    e.preventDefault();
    if (isValidInput()) {
      dispatch(saveShippingAddress(fullAddress));
      history.push('/payment');
    }
  };

  useEffect(() => {
    formValidator();
  }, [formValidator]);

  useEffect(() => {
    if (!loggedUser) {
      history.push('/login/redirect=cart');
    }
  });

  return (
    <StyledShipping>
      <OrderStages currentStage={2} />
      <ShippingForm onSubmit={saveAddressHandler}>
        <h3>Shipping details:</h3>
        <Input
          label='Address:'
          placeholder='Your address'
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          error={addressError}
        />
        <StyledSelect>
          <p>Country:</p>
          <select onChange={(e) => setCountry(e.target.value)} value={country}>
            <option hidden>Select a country</option>
            {shippingCountries.map((country) => (
              <option value={country} key={uuidv4()}>
                {country}
              </option>
            ))}
          </select>
        </StyledSelect>
        <Input
          label='City:'
          placeholder='Your City'
          onChange={(e) => setCity(e.target.value)}
          value={city}
          error={cityError}
        />
        <Input
          label='Postal Code:'
          placeholder='Your Postal Code'
          onChange={(e) => setPostalCode(e.target.value)}
          value={postalCode}
          error={postalCodeError}
        />
        <Button submit color='red' text='Save address' />
      </ShippingForm>
    </StyledShipping>
  );
};

const StyledShipping = styled(GlobalPageInit)`
  margin-top: 1rem;
`;

const ShippingForm = styled(StyledForm)``;

const StyledSelect = styled.div`
  p {
    margin-bottom: 0.3rem;
    font-weight: bold;
  }
  select {
    margin-top: 0.5rem;
    border: 1px solid ${colorsVariables.colorSecDark};
  }
`;

export default Shipping;
