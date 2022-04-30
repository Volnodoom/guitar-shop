import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../const';
import CardDetailed from '../card-detailed/card-detailed';
import Cart from '../cart/cart';
import Catalog from '../catalog/catalog';
import Layout from '../layout/layout';

function App(): JSX.Element {
  return(
    <Routes>
      <Route path={AppRoutes.Root} element={<Navigate to={AppRoutes.Catalog} replace/>}/>
      <Route path={AppRoutes.Catalog} element={<Layout />}>
        <Route index element={<Catalog />} />
        <Route path={AppRoutes.Guitar()} element={<CardDetailed />} />
        <Route path={AppRoutes.Cart} element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
