import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';

const User = ({ username, fullname }) => {
  return !username || !fullname ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className="grid items-center grid-cols-4 gap-4 mb-6">
      <div className="flex items-center justify-center col-span-1">
        <img
          className="flex w-16 mr-3 rounded-full"
          src={`/images/avatars/${username}.jpg`}
          alt="user"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
      </div>
      <div className="col-span-3">
        <p className="text-sm font-bold">{username}</p>
        <p className="text-sm">{fullname}</p>
      </div>
    </Link>
  );
};

User.propTypes = {
  username: PropTypes.string,
  fullname: PropTypes.string
};

export default User;
