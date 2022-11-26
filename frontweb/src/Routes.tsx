import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import Admin from 'pages/Admin';
import ProductDetails from 'pages/ProductDetails';
import Auth from 'pages/Admin/Auth';

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact> {/* Abrir somento quando for exatament */}
        <Home />
      </Route>
      <Route path="/products" exact>
        <Catalog />
      </Route>
      <Route path="/products/:productId"> {/* Sintaxe do argumento para rota ID */}
        <ProductDetails />
      </Route>
      <Route path="/admin/auth">
        <Auth></Auth>
      </Route>
      {/* Redirect: Deixar o products como acesso padrão do ADMIN */}
      {/* Exact pois se não cai no admin normal */}
      <Redirect from="/admin" to="admin/products" exact/>
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
