import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/Profile';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  const checkUserExist = useCallback(async () => {
    const [user] = await getUserByUsername(username);
    if (user?.userId) setUser(user);
    else history.push(ROUTES.NOT_FOUND);
  }, [user]);

  useEffect(() => {
    checkUserExist();
  }, [username, history]);

  return (
    user?.username ?? (
      <div className="bg-gray-background">
        <Header />
        <div className="max-w-screen-lg mx-auto">
          <UserProfile user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;
