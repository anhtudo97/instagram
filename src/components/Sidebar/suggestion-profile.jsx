import { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
  getUserByUserId
} from '../../services/firebase';
import LoggedInUserContext from '../../context/logged-in-user';

const SuggestedProfile = ({ profileDocId, username, profileId, userId, loggedInUserDocId }) => {
  const [followed, setFollowed] = useState(false);
  const { setActiveUser } = useContext(LoggedInUserContext);

  const handleFollowUser = useCallback(async () => {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
    const [user] = await getUserByUserId(userId);
    setActiveUser(user);
  }, [followed, setActiveUser]);

  return (
    !followed ?? (
      <div className="flex items-center justify-between align-items">
        <div className="flex items-center justify-between">
          <img
            className="flex w-8 mr-3 rounded-full"
            src={`/images/avatars/${username}.jpg`}
            alt=""
            onError={(e) => {
              e.target.src = `/images/avatars/default.png`;
            }}
          />
          <Link to={`/p/${username}`}>
            <p className="text-sm font-bold">{username}</p>
          </Link>
        </div>
        <button
          className="text-xs font-bold text-blue-medium"
          type="button"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    )
  );
};

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
};
