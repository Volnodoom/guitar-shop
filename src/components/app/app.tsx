import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { CardDetailed } from '../card/card';
import Catalog from '../catalog/catalog';
import Layout from '../layout/layout';

function App(): JSX.Element {
  return(
    <Routes>
      <Route path={AppRoutes.Root} element={<Navigate to={AppRoutes.Catalog} replace/>}/>
      <Route path={AppRoutes.Catalog} element={<Layout />}>
        <Route index element={<Catalog />} />
        <Route path={AppRoutes.Cart} element={<CardDetailed />} />
      </Route>
    </Routes>
  );
}

export default App;
