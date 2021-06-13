import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export const useUser = (userId) => {
  const [activeUser, setActiveUser] = useState();

  const getUserObjByUserId = async () => {
    const [user] = await getUserByUserId(userId);
    setActiveUser(user || {});
  };

  useEffect(() => {
    if (userId) getUserObjByUserId(userId);
  }, [userId]);

  return { user: activeUser, setActiveUser };
};
