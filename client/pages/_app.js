import 'bootstrap/dist/css/bootstrap.css';
import api from '../utils/api';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component { ...pageProps } currentUser={currentUser} />
    </div>
  )
}

AppComponent.getInitialProps = async (context) => {
  const { data } = await api(context.ctx).get('/api/users/currentuser');
  let pageProps = {};

  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx);
  }

  return { pageProps, ...data };
}

export default AppComponent;