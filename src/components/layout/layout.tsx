import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../common/common';

function Layout() {
  return(
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
