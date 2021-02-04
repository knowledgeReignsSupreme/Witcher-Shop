import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Cart/actions';
import { colorsVariables } from '../GlobalStyles';
import styled from 'styled-components';
import Button from './Button';
import { FaCartPlus } from 'react-icons/fa';

const AddToCartButton = ({ currentProduct, quantity }) => {
  const [feedback, setFeedback] = useState(false);

  const dispatch = useDispatch();

  const cartHandler = (itemId, quantity) => {
    dispatch(addToCart(itemId, quantity));
    showFeedback();
  };

  const showFeedback = () => {
    setFeedback((prevFeedback) => true);
    setTimeout(() => {
      setFeedback((prevFeedback) => false);
    }, 2000);
  };

  return (
    <>
      <Button
        text='Add to cart'
        icon={<FaCartPlus />}
        type='red'
        args={[currentProduct._id, quantity]}
        handleClick={cartHandler}
      />
      {feedback && (
        <Feedback>
          <h3>Added successfully!</h3>
        </Feedback>
      )}
    </>
  );
};

const Feedback = styled.div`
  position: sticky;
  margin-top: 0.2rem;
  color: ${colorsVariables.colorMainLight};
`;

export default AddToCartButton;
