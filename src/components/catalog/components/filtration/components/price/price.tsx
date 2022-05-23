import { GuitarPluralRu, KindOfGuitars } from '../../../../../../const';

function Price (): JSX.Element {
  return(
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
  );
}

export default Price;
