import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/Sidebar';
import { useUser } from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';

const Dashboard = ({ user: loggedInUser }) => {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid justify-between max-w-screen-lg grid-cols-3 gap-4 mx-auto">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default Dashboard;
