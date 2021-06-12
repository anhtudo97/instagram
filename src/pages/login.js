import clsx from 'clsx';
import { useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import FirebaseContext from '../context/firebase';

const initialState = {
  email: '',
  password: '',
  error: ''
};

const ACTION_TYPE = {
  SET_EMAIL: 'SET_EMAIL',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_ERROR: 'SET_ERROR'
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case ACTION_TYPE.SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case ACTION_TYPE.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, error } = state;
  const history = useHistory();

  const { firebase } = useContext(FirebaseContext);

  const isInvalid = useMemo(() => password === '' || email === '', [password, email]);

  const onEmailChange = useCallback(({ target }) => {
    dispatch({ type: ACTION_TYPE.SET_EMAIL, payload: target.value });
  }, []);
  const onPasswordChange = useCallback(({ target }) => {
    dispatch({ type: ACTION_TYPE.SET_PASSWORD, payload: target.value });
  }, []);

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        dispatch({ type: ACTION_TYPE.SET_EMAIL, payload: '' });
        dispatch({ type: ACTION_TYPE.SET_PASSWORD, payload: '' });
        dispatch({ type: ACTION_TYPE.SET_ERROR, payload: error.message });
      }
    },
    [firebase, email, password]
  );

  return (
    <div className="container flex items-center h-screen max-w-screen-md mx-auto select-none">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center p-4 mb-4 bg-white border rounded border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="Instagram" className="w-6/12 mt-2 mb-4" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form className="w-full" onSubmit={handleLogin} method="POST">
            <input
              type="text"
              aria-label="Enter your email"
              placeholder="Email address"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary"
              onChange={onEmailChange}
              value={email}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary"
              onChange={onPasswordChange}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={clsx(
                'bg-blue-medium text-white w-full rounded h-8 font-bold',
                isInvalid && 'opacity-50'
              )}
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-4 bg-white border rounded border-gray-primary">
          <p className="text-sm">
            Don't have an account?
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
