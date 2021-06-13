import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<p>Loading</p>}>
          <Route path={ROUTES.LOGIN} component={Login} exact />
          <Route path={ROUTES.SIGN_UP} component={Signup} exact />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
          <Route path={ROUTES.NOT_FOUND} component={NotFound} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
