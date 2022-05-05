import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes, ONE } from '../../const';
import CardDetailed from '../card-detailed/card-detailed';
import Cart from '../cart/cart';
import Catalog from '../catalog/catalog';
import Layout from '../layout/layout';
import NotAvailablePage from '../not-available-page/not-available-page';

function App(): JSX.Element {
  return(
    <Routes>
      <Route path={AppRoutes.Root} element={<Navigate to={AppRoutes.Catalog(ONE)} replace/>}/>
      <Route path={AppRoutes.Catalog(ONE)} element={<Layout />}>
        <Route index element={<Catalog />} />
        <Route path={AppRoutes.Guitar()} element={<CardDetailed />} />
        <Route path={AppRoutes.Cart} element={<Cart />} />
      </Route>
      <Route path={AppRoutes.NotExisted} element={<NotAvailablePage />} />
    </Routes>
  );
}

export default App;
