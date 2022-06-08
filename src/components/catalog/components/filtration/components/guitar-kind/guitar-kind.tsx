import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { GuitarPluralRu, KindOfGuitars, QueryRoutes } from '../../../../../../const';
import { useAppDispatch } from '../../../../../../hooks/hook';
import { clearGuitarsIdPerPage } from '../../../../../../store/data-guitars/data-guitars';
import { addFilterByType, removeFilterByType } from '../../../../../../store/query-params/query-params';
import * as selectorQuery from '../../../../../../store/query-params/selector-query';
import { isCurrentElementActive, removeCurrentElementFromArray } from '../../../../../../utils/utils-components';

function GuitarKind (): JSX.Element {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const filterActive = useSelector(selectorQuery.getFilterByType);

  const handleLabelClick = (engGuitarKind: string) => () => {
    if(isCurrentElementActive(engGuitarKind, filterActive)) {
      dispatch(removeFilterByType(engGuitarKind));
      setSearchParams(
        {[QueryRoutes.Type]: removeCurrentElementFromArray(engGuitarKind, filterActive)}
      );
    } else {
      dispatch(addFilterByType(engGuitarKind));
      setSearchParams({[QueryRoutes.Type]: engGuitarKind});
    }

    dispatch(clearGuitarsIdPerPage());
  };


  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {
        Object.values(KindOfGuitars).map((line) => (
          <div className="form-checkbox catalog-filter__block-item" key={`filter-guitar-${line}`}>
            <input
              className="visually-hidden"
              type="checkbox" id={line}
              name={line}
              defaultChecked={isCurrentElementActive(line, filterActive)}
            />
            <label htmlFor={line} onClick={handleLabelClick(line)}>{GuitarPluralRu[line]}</label>
          </div>
        ))
      }
    </fieldset>
  );
}

export default GuitarKind;
