import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { cssVariables } from '../GlobalStyles';
import Button from './Button';
import { FaTrash, FaCoins } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ProductRow = ({
  product,
  usage,
  removeHandler,
  quantityChangeHandler,
}) => {
  return (
    <StyledRow usage={usage}>
      <Header>
        <img src={`/images/${product.image}`} alt='' />
      </Header>
      <Text>
        <Link to={`/product/${product.slug}/${product.productId}`}>
          <h3>{product.title}</h3>
          <p>
            {product.price * product.quantity} <FaCoins />
          </p>
          <p>In cart: {product.quantity}</p>
        </Link>
      </Text>
      {usage === 'cart' && (
        <Actions>
          <p>Quantity:</p>
          <select
            name=''
            id=''
            onChange={(e) => quantityChangeHandler(e, product.productId)}
            defaultValue={product.quantity}
          >
            {[...Array(product.countInStock).keys()].map((num) => (
              <option value={num + 1} key={uuidv4()}>
                {num + 1}
              </option>
            ))}
          </select>
          <Button
            icon={<FaTrash />}
            color='red'
            handleClick={removeHandler}
            args={[product.productId]}
            text='Remove'
          />
        </Actions>
      )}
      {usage === 'order' && (
        <SumExplaination>
          {product.quantity} X {product.price} = $
          {+product.quantity * +product.price}
        </SumExplaination>
      )}
    </StyledRow>
  );
};

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  margin: ${(props) => props.usage === 'cart' && '0 auto'};
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 35rem;
  box-shadow: ${cssVariables.boxShadow};
`;

const Header = styled.div`
  img {
    max-width: 3rem;
    margin-right: 0.5rem;
  }
`;

const Text = styled.div`
  width: ${(props) => (props.usage === 'cart' ? '40%' : '50%')};
  p {
    margin-bottom: 0.5rem;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const SumExplaination = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  white-space: nowrap;
  font-weight: bold;
  font-size: 0.8rem;
`;
export default ProductRow;
