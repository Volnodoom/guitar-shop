import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { GuitarTypeStringNumberCombination, KindOfGuitars, QueryRoutes, STRING_NUMBERS } from '../../../../../../const';
import { useAppDispatch } from '../../../../../../hooks/hook';
import { clearGuitarsIdPerPage } from '../../../../../../store/data-guitars/data-guitars';
import { addFilterByString, removeFilterByString } from '../../../../../../store/query-params/query-params';
import * as selectorQuery from '../../../../../../store/query-params/selector-query';
import { isCurrentElementActive, removeCurrentElementFromArray } from '../../../../../../utils/utils-components';

function StringNumber (): JSX.Element {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const activeTypes = useSelector(selectorQuery.getFilterByType);
  const activeStringNumbers = useSelector(selectorQuery.getFilterStringNumber);

  const isActiveString = (currentString: number) => {
    const initialStart = !isCurrentElementActive(KindOfGuitars.Acoustic, activeTypes) && !isCurrentElementActive(KindOfGuitars.Electric, activeTypes) && !isCurrentElementActive(KindOfGuitars.Ukulele, activeTypes);
    if(initialStart) {
      return true;
    }
    const isAcousticStringsActive = isCurrentElementActive(KindOfGuitars.Acoustic, activeTypes)
      && isCurrentElementActive(currentString, GuitarTypeStringNumberCombination[KindOfGuitars.Acoustic]);

    const isElectricStringsActive = isCurrentElementActive(KindOfGuitars.Electric, activeTypes)
    && isCurrentElementActive(currentString, GuitarTypeStringNumberCombination[KindOfGuitars.Electric]);

    const isUkuleleStringsActive = isCurrentElementActive(KindOfGuitars.Ukulele, activeTypes)
    && isCurrentElementActive(currentString, GuitarTypeStringNumberCombination[KindOfGuitars.Ukulele]);

    return isAcousticStringsActive || isElectricStringsActive || isUkuleleStringsActive;
  };

  const handleCheckboxClick = (currentValue: number) => () => {
    if(isCurrentElementActive(currentValue, activeStringNumbers)) {
      dispatch(removeFilterByString(currentValue));
      setSearchParams(
        {[QueryRoutes.StringNumber]: removeCurrentElementFromArray(String(currentValue), activeStringNumbers.map((line) => String(line)))}
      );
    } else {
      dispatch(addFilterByString(currentValue));
      setSearchParams({[QueryRoutes.StringNumber]: String(currentValue)});
    }

    dispatch(clearGuitarsIdPerPage());
  };

  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {
        STRING_NUMBERS.map((valueNumber) => (
          <div className="form-checkbox catalog-filter__block-item" key={`filter-string-number-${valueNumber}`}>
            <input
              className="visually-hidden"
              type="checkbox"
              id={`${valueNumber}-strings`}
              name={`${valueNumber}-strings`}
              disabled={!isActiveString(valueNumber)}
              onChange={handleCheckboxClick(valueNumber)}
              defaultChecked={isCurrentElementActive(valueNumber, activeStringNumbers)}
            />
            <label htmlFor={`${valueNumber}-strings`}>{valueNumber}</label>
          </div>
        ))
      }
    </fieldset>
  );
}

export default StringNumber;
