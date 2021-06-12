import { useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

const initialState = {
  username: '',
  fullname: '',
  email: '',
  password: '',
  error: ''
};

const ACTION_TYPE = {
  SET_EMAIL: 'SET_EMAIL',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_USERNAMES: 'SET_USERNAMES',
  SET_FULLNAME: 'SET_FULLNAME',
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
    case ACTION_TYPE.USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case ACTION_TYPE.SET_FULLNAME:
      return {
        ...state,
        fullname: action.payload
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

const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, fullname, email, password, error } = state;

  const isInvalid = useMemo(() => password === '' || email === '', [password, email]);

  const handleSignUp = useCallback(async (event) => {
    event.preventDefault();

    const usernameIsExists = await doesUsernameExist(username);

    if (!usernameIsExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username
        });

        // firebase user collection (create a document)
        await firebase
          .firestore()
          .collection('users')
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName: fullname,
            emailAddress: email.toLowerCase(),
            following: ['2'],
            followers: [],
            dateCreated: Date.now()
          });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        dispatch({ type: ACTION_TYPE.SET_EMAIL, payload: '' });
        dispatch({ type: ACTION_TYPE.SET_FULLNAME, payload: '' });
        dispatch({ type: ACTION_TYPE.SET_PASSWORD, payload: '' });
        dispatch({ type: ACTION_TYPE.SET_ERROR, payload: error.message });
      }
    } else {
      dispatch({ type: ACTION_TYPE.USERNAME, payload: '' });
      dispatch({
        type: ACTION_TYPE.SET_ERROR,
        payload: 'That username is already taken, please try another.'
      });
    }
  }, []);

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  const onUsernameChange = useCallback(({ target }) => {
    dispatch({ type: ACTION_TYPE.SET_USERNAMES, payload: target.value });
  }, []);

  const onFullnameChange = useCallback(({ target }) => {
    dispatch({ type: ACTION_TYPE.SET_FULLNAME, payload: target.value });
  }, []);

  const onEmailChange = useCallback(({ target }) => {
    dispatch({ type: ACTION_TYPE.SET_EMAIL, payload: target.value });
  }, []);

  const onPasswordChange = useCallback(({ target }) => {
    dispatch({ type: ACTION_TYPE.SET_PASSWORD, payload: target.value });
  }, []);

  return (
    <div className="container flex items-center h-screen max-w-screen-md mx-auto">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center p-4 mb-4 bg-white border rounded border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="Instagram" className="w-6/12 mt-2 mb-4" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary"
              onChange={onUsernameChange}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary"
              onChange={onFullnameChange}
              value={fullname}
            />
            <input
              aria-label="Enter your email address"
              type="text"
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
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
          ${isInvalid && 'opacity-50'}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-4 bg-white border rounded border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
