import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/hook';
import { clearGuitarsIdPerPage } from '../../../../store/data-guitars/data-guitars';
import { clearQueryParams } from '../../../../store/query-params/query-params';
import { GuitarKind, Price, StringNumber } from './components/components';

function Filtration():JSX.Element {
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();
  const [isReset, setIsReset] = useState(false);

  const handleClick = () => {
    setSearchParams({});
    dispatch(clearQueryParams());
    dispatch(clearGuitarsIdPerPage());
    setIsReset(true);
  };

  return(
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <Price isReset={isReset} resetFunction={setIsReset}/>
      <GuitarKind />
      <StringNumber />
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={handleClick}
      >Очистить
      </button>
    </form>
  );
}

export default Filtration;
