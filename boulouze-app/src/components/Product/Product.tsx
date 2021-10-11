import React, { useEffect } from 'react';
import './Product.css';

interface ContainerProps {
  setProduct: Function;
}

const Product: React.FC<ContainerProps> = ({ setProduct }) => {
  useEffect(() => {
    setProduct({ name: 'Belette' });
  }, [setProduct]);

  return (
    <div className="container">
      <strong>Yes</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default Product;
