import { useSelector } from 'react-redux';
import { useState, ChangeEvent, FocusEvent, useEffect } from 'react';
import { LOCAL_RU, PRICE_MAX, PRICE_MIN, QueryRoutes } from '../../../../../../const';
import * as selectorGuitar from '../../../../../../store/data-guitars/selectors-guitars';
import { useAppDispatch } from '../../../../../../hooks/hook';
import { setPriceRangeEnd, setPriceRangeStart } from '../../../../../../store/query-params/query-params';
import { useSearchParams } from 'react-router-dom';
import { clearGuitarsIdPerPage } from '../../../../../../store/data-guitars/data-guitars';
import * as selectorQuery from '../../../../../../store/query-params/selector-query';

function Price (): JSX.Element {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const priceRange = useSelector(selectorGuitar.getPriceExtremes);
  const getCurrentPriceStart = useSelector(selectorQuery.getPriceRangeStart);
  const getCurrentPriceEnd = useSelector(selectorQuery.getPriceRangeEnd);

  const [minPrice, setMinPrice] = useState<string | number>('');
  const [maxPrice, setMaxPrice] = useState<string | number>('');

  useEffect(() => {
    if(getCurrentPriceStart) {
      setMinPrice(getCurrentPriceStart);
    }
    if(getCurrentPriceEnd) {
      setMaxPrice(getCurrentPriceEnd);
    }
  }, [getCurrentPriceEnd, getCurrentPriceStart]);

  const hasMinPrice = Boolean(minPrice);
  const hasMaxPrice = Boolean(maxPrice);

  const correctMinPrice = () => {
    if(priceRange && hasMinPrice && minPrice < priceRange.min) {
      setMinPrice(priceRange.min);
      dispatch(setPriceRangeStart(priceRange.min));
    }

    if(priceRange && minPrice > priceRange.max) {
      setMinPrice(priceRange.max);
      dispatch(setPriceRangeStart(priceRange.max));
    }

    if(priceRange && hasMaxPrice && hasMinPrice && maxPrice < minPrice) {
      setMaxPrice(minPrice);
    }

    if(!hasMinPrice) {
      dispatch(setPriceRangeStart(null));
    }

    setSearchParams({[QueryRoutes.PriceStart]: String(minPrice)});
    dispatch(clearGuitarsIdPerPage());
  };


  const correctMaxPrice = () => {
    if(priceRange && maxPrice > priceRange.max) {
      setMaxPrice(priceRange.max);
      dispatch(setPriceRangeEnd(priceRange.max));
    }

    if(priceRange && hasMaxPrice && maxPrice < priceRange.min) {
      setMaxPrice(priceRange.min);
      dispatch(setPriceRangeEnd(priceRange.min));
    }

    if(priceRange && hasMaxPrice && hasMinPrice && maxPrice < minPrice) {
      setMaxPrice(minPrice);
    }

    if(hasMaxPrice === false) {
      dispatch(setPriceRangeEnd(null));
    }

    setSearchParams({[QueryRoutes.PriceEnd]: String(maxPrice)});
    dispatch(clearGuitarsIdPerPage());
  };

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
        correctMinPrice();
        break;
      case PRICE_MAX:
        correctMaxPrice();
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
