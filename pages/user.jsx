import { Typography, Button } from '@material-ui/core';
import { setCommonState } from 'use-common-state';
import router from 'next/router';
import Page from '../components/Page';
import withUser from '../utils/withUser';

const UserPage = (props) => {
  const { user } = props;

  const handleLogoutClick = () => {
    fetch('/api/logout').then(() => {
      setCommonState('user', null);
      router.push('/');
    });
  };

  return (
    <Page>
      {user.name && (
        <>
          <Typography variant="h4" style={{ marginBottom: '20px' }}>{user.name}</Typography>
          <Button onClick={handleLogoutClick} color="primary" variant="contained">Выйти</Button>
        </>
      )}
    </Page>
  );
};

export default withUser(UserPage);
