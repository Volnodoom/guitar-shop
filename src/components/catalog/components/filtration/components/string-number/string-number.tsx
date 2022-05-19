import { STRING_NUMBERS } from '../../../../../../const';

function StringNumber (): JSX.Element {
  return(
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
  );
}

export default StringNumber;
