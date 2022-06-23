import { useSelector } from 'react-redux';
import { useState, ChangeEvent, FocusEvent, useEffect, KeyboardEvent } from 'react';
import { LOCAL_RU, PRICE_MAX, PRICE_MIN, QueryRoutes } from '../../../../../../const';
import * as selectorGuitar from '../../../../../../store/data-guitars/selectors-guitars';
import { useAppDispatch } from '../../../../../../hooks/hook';
import { setPriceRangeEnd, setPriceRangeStart } from '../../../../../../store/query-params/query-params';
import { useSearchParams } from 'react-router-dom';
import { clearGuitarsIdPerPage } from '../../../../../../store/data-guitars/data-guitars';
import * as selectorQuery from '../../../../../../store/query-params/selector-query';
import { checkStatusFailed, checkStatusLoading, isEnter } from '../../../../../../utils/utils-components';
import { fetchPriceExtreme } from '../../../../../../store/data-guitars/actions-guitars';

type PriceProps = {
  isReset: boolean,
  resetFunction: React.Dispatch<React.SetStateAction<boolean>>,
};

function Price ({isReset, resetFunction}: PriceProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const priceRange = useSelector(selectorGuitar.getPriceExtremes);
  const priceStatus = useSelector(selectorGuitar.getPriceStatus);
  const getCurrentPriceStart = useSelector(selectorQuery.getPriceRangeStart);
  const getCurrentPriceEnd = useSelector(selectorQuery.getPriceRangeEnd);
  const isLoading = checkStatusLoading(priceStatus);
  const isFailed = checkStatusFailed(priceStatus);

  const getFilterStringNumber = useSelector(selectorQuery.getFilterStringNumber);
  const getCurrentFilterType = useSelector(selectorQuery.getFilterByType);

  const [minPrice, setMinPrice] = useState<string | number>('');
  const [minPricePrevious, setMinPricePrevious] = useState<string | number>('');
  const [maxPrice, setMaxPrice] = useState<string | number>('');
  const [maxPricePrevious, setMaxPricePrevious] = useState<string | number>('');

  useEffect(() => {
    if(getCurrentPriceStart) {
      setMinPrice(getCurrentPriceStart);
      setMinPricePrevious(getCurrentPriceStart);
    }
    if(getCurrentPriceEnd) {
      setMaxPrice(getCurrentPriceEnd);
      setMaxPricePrevious(getCurrentPriceEnd);
    }
  }, [getCurrentPriceEnd, getCurrentPriceStart]);

  useEffect(() => {
    if(isReset) {
      setMaxPrice('');
      setMinPrice('');
      setMinPricePrevious('');
      setMaxPricePrevious('');
      resetFunction(false);
    }
  }, [isReset, resetFunction]);

  useEffect(() => {
    dispatch(fetchPriceExtreme());
  },[dispatch, getFilterStringNumber, getCurrentFilterType]);


  const hasMinPrice = Boolean(minPrice);
  const hasMaxPrice = Boolean(maxPrice);

  const setUrlQueryParam = () => {
    if(hasMinPrice && hasMaxPrice) {
      setSearchParams({
        [QueryRoutes.PriceStart]: String(minPrice),
        [QueryRoutes.PriceEnd]: String(maxPrice),
      });
    }
    if(!hasMinPrice && hasMaxPrice) {
      setSearchParams({[QueryRoutes.PriceEnd]: String(maxPrice)});
    }
    if(hasMinPrice && !hasMaxPrice) {
      setSearchParams({[QueryRoutes.PriceStart]: String(minPrice)});
    }
    if(!hasMinPrice && !hasMaxPrice) {
      searchParams.delete(QueryRoutes.PriceStart);
      searchParams.delete(QueryRoutes.PriceEnd);
    }
  };

  const correctMinPrice = () => {
    if(minPricePrevious === minPrice) {
      return;
    } else {
      setMinPricePrevious(minPrice);
    }

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

    setUrlQueryParam();
    dispatch(clearGuitarsIdPerPage());
  };


  const correctMaxPrice = () => {
    if(maxPricePrevious === maxPrice) {
      return;
    } else {
      setMaxPricePrevious(maxPrice);
    }

    if(priceRange && maxPrice > priceRange.max) {
      setMaxPrice(priceRange.max);
      dispatch(setPriceRangeEnd(priceRange.max));
    }

    if(priceRange && hasMaxPrice && !hasMinPrice && maxPrice < priceRange.min) {
      setMaxPrice(priceRange.min);
      dispatch(setPriceRangeEnd(priceRange.min));
    }

    if(priceRange && hasMaxPrice && hasMinPrice && maxPrice < minPrice) {
      setMaxPrice(minPrice);
    }

    if(hasMaxPrice === false) {
      dispatch(setPriceRangeEnd(null));
    }

    setUrlQueryParam();
    dispatch(clearGuitarsIdPerPage());
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const elementMin: boolean = (evt.target as HTMLInputElement).id === PRICE_MIN;
    const elementMax: boolean = (evt.target as HTMLInputElement).id === PRICE_MAX;
    const inputValue = (evt.target as HTMLInputElement).value;

    if(elementMin && inputValue === String(minPrice)) {
      return;
    }
    if(elementMax && inputValue === String(maxPrice)) {
      return;
    }


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

  const handleBlurInputExit = (evt: FocusEvent<HTMLInputElement>) => {
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

  const handleKeyDownInputExit = (evt: KeyboardEvent<HTMLInputElement>) => {
    switch((evt.target as HTMLInputElement).id) {
      case PRICE_MIN:
        isEnter(evt.code) && correctMinPrice();
        break;
      case PRICE_MAX:
        isEnter(evt.code) && correctMaxPrice();
        break;
      default:
        break;
    }
  };

  if(
    (priceRange && (priceRange.min < 0 || priceRange.max < 0))
    ||
    isFailed
    ||
    isLoading
  ) {
    return(
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              id={PRICE_MIN}
              name="от"
              value={minPrice}
              onChange={handleChange}
              onBlur={handleBlurInputExit}
              onKeyDown={handleKeyDownInputExit}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              id={PRICE_MAX}
              name="до"
              value={maxPrice}
              onChange={handleChange}
              onBlur={handleBlurInputExit}
              onKeyDown={handleKeyDownInputExit}
            />
          </div>
        </div>
      </fieldset>
    );
  }


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
            onBlur={handleBlurInputExit}
            onKeyDown={handleKeyDownInputExit}
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
            onBlur={handleBlurInputExit}
            onKeyDown={handleKeyDownInputExit}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default Price;
