import ajax from './ajax';
import Page from '../components/Page';

function withUser(Component) {
  function ProtectedPage(props) {
    const { user } = props;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return user.name ? <Component {...props} /> : <Page>Сообщение для неавторизованного пользователя</Page>;
  }

  ProtectedPage.getInitialProps = async ({ req }) => {
    const url = typeof window === 'undefined' ? `${process.env.API_PATH}/auth/user` : '/api/auth/user';
    const headers = {};
    if (req && req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }
    const response = await ajax(url, { headers });

    return { user: response.data };
  };

  return ProtectedPage;
}

export default withUser;
