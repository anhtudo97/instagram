import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  const suggestedProfiles = useCallback(async () => {
    const response = await getSuggestedProfiles(userId, following);
    setProfiles(response);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : (
    profiles.length > 0 ?? (
      <div className="flex flex-col rounded">
        <div className="flex items-center justify-between mb-2 text-sm align-items">
          <p className="font-bold text-gray-base">Suggestions for you</p>
        </div>
        <div className="grid gap-5 mt-4">
          {profiles.map((profile) => (
            <SuggestedProfile
              key={profile.docId}
              profileDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
              loggedInUserDocId={loggedInUserDocId}
            />
          ))}
        </div>
      </div>
    )
  );
};

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
};
