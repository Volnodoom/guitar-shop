import { useSelector } from 'react-redux';
import { useState, ChangeEvent, FocusEvent } from 'react';
import { LOCAL_RU, PRICE_MAX, PRICE_MIN } from '../../../../../../const';
import * as selectorGuitar from '../../../../../../store/data-guitars/selectors-guitars';

function Price (): JSX.Element {
  const priceRange = useSelector(selectorGuitar.getPriceExtremes);

  const [minPrice, setMinPrice] = useState<string | number>('');
  const [maxPrice, setMaxPrice] = useState<string | number>('');

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    switch((evt.target as HTMLInputElement).id) {
      case PRICE_MIN:
        (evt.target as HTMLInputElement).value === ''
          ? setMinPrice('')
          : setMinPrice((evt.target as HTMLInputElement).valueAsNumber);
        break;
      case PRICE_MAX:
        (evt.target as HTMLInputElement).value === ''
          ? setMaxPrice('')
          : setMaxPrice((evt.target as HTMLInputElement).valueAsNumber);
        break;
      default:
        break;
    }
  };

  const handleInputExit = (evt: FocusEvent<HTMLInputElement>) => {
    switch((evt.target as HTMLInputElement).id) {
      case PRICE_MIN:
        priceRange && minPrice !== '' && minPrice < priceRange.min && setMinPrice(priceRange.min);
        priceRange && minPrice > priceRange.max && setMinPrice(priceRange.max);
        priceRange && maxPrice !== '' && minPrice !== '' && maxPrice < minPrice && setMaxPrice(minPrice);
        break;
      case PRICE_MAX:
        priceRange && maxPrice > priceRange.max && setMaxPrice(priceRange.max);
        priceRange && maxPrice !== '' && maxPrice < priceRange.min && setMaxPrice(priceRange.min);
        priceRange && maxPrice !== '' && minPrice !== '' && maxPrice < minPrice && setMaxPrice(minPrice);
        break;
      default:
        break;
    }
  };

  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={priceRange ? priceRange.min.toLocaleString(LOCAL_RU) : ''}
            id={PRICE_MIN}
            name="от"
            value={minPrice}
            onChange={handleChange}
            onBlur={handleInputExit}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={priceRange ? priceRange.max.toLocaleString(LOCAL_RU) : ''}
            id={PRICE_MAX}
            name="до"
            value={maxPrice}
            onChange={handleChange}
            onBlur={handleInputExit}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default Price;
