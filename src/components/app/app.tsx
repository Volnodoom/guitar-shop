import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../const';
import Catalog from '../catalog/catalog';
import Layout from '../layout/layout';

function App(): JSX.Element {
  return(
    <Routes>
      <Route path={AppRoutes.Catalog} element={<Layout />}>
        <Route index element={<Catalog />}/>
      </Route>
    </Routes>
  );
}

export default App;
