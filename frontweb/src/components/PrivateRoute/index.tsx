import { Redirect, Route } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated, Role } from 'util/auth';

type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[]
};

const PrivateRoute = ({ children, path, roles = [] }: Props) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        // Abaixo: não (!) está autenticado? Vai pro "/admin/auth/login"
        !isAuthenticated() ? (
          <Redirect 
            to={{
              pathname: "/admin/auth/login",
              state: { from: location}
            }} 
          />
        // Está autenticado, mas não tem a "ROLE_ADMIN"? Vai para o "/admin/products"
        ) : !hasAnyRoles(roles) ? (
          <Redirect to="/admin/products" />
        ) : (
          <>{children}</>
        )
      }
    />
  );
};

export default PrivateRoute;
