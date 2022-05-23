import { GuitarKind, Price, StringNumber } from './components/components';

function Filtration():JSX.Element {
  return(
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <GuitarKind />
      <Price />
      <StringNumber />
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default Filtration;
