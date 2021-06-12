import { useContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
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
        email: action.payload
      };
    case ACTION_TYPE.SET_PASSWORD:
      return {
        password: action.payload
      };
    case ACTION_TYPE.SET_ERROR:
      return {
        error: action.payload
      };
    default:
      return state;
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(initialState, reducer);
  const { email, password, error } = state;
  const history = useHistory();

  const { firebase, FieldValue } = useContext(FirebaseContext);

  const isInvalid = password === '' || email === '';

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return <h1>{email}</h1>;
};

export default Login;
