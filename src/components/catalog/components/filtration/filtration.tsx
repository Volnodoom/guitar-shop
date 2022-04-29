import { GuitarPluralRu, KindOfGuitars, STRING_NUMBERS } from '../../../../const';

function Filtration():JSX.Element {
  return(
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder="1 000" id="priceMin" name="от" />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder="30 000" id="priceMax" name="до" />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          Object.values(KindOfGuitars).map((line) => (
            <div className="form-checkbox catalog-filter__block-item" key={`filter-guitar-${line}`}>
              <input className="visually-hidden" type="checkbox" id={line} name={line} />
              <label htmlFor={line}>{GuitarPluralRu[line]}</label>
            </div>
          ))
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          STRING_NUMBERS.map((valueNumber) => (
            <div className="form-checkbox catalog-filter__block-item" key={`filter-string-number-${valueNumber}`}>
              <input className="visually-hidden" type="checkbox" id={`${valueNumber}-strings`} name={`${valueNumber}-strings`} />
              <label htmlFor={`${valueNumber}-strings`}>{valueNumber}</label>
            </div>
          ))
        }
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default Filtration;
