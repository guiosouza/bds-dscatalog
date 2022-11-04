import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import axios from 'axios';
import ProductPrice from 'components/ProductPrice';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { BASE_URL } from 'util/requests';
import './styles.css';

type UrlParams = {
  productId: string;
}

const ProductDetails = () => {

  // [estado do objeto, função para atualiação o valor do estado]:

  const {productId} = useParams<UrlParams>();

  const [product, setProduct] = useState<Product>();


  // useEffect recebe uma função e uma lista de dependências
  useEffect(() => {
    axios.get(`${BASE_URL}/products/${productId}`)
    .then(response => {
      setProduct(response.data)
    });
  }, [productId]);


  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <Link to="/products">
          <div className="goback-container">
            <ArrowIcon />
            <h2>VOLTAR</h2>
          </div>
        </Link>
        <div className="row">
          {' '}
          {/*row é uma classe do bootstrap*/}
          <div className="col-xl-6">
            {' '}
            {/*a partir de 1200px, divide por 2 porque o grid tem o total de 12 colunas*/}
            <div className="img-container">
              <img
                src={product?.imgUrl}
                alt={product?.name}
              />
            </div>
            <div className="name-price-container">
              <h1>{product?.name}</h1>
              {product && <ProductPrice price={product?.price} />}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>Descrição do produto</h2>
              <p>
              {product?.description }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
