import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashKind, PageScrollOptions } from '../../../../const';
import { useIdGetProductInfo } from '../../../../hooks/use-id-get-product-info/use-id-get-product-info';
import { GuitarType } from '../../../../types/general.types';

function Tabs (): JSX.Element {
  const [guitar] = useIdGetProductInfo();
  const tabRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const [isCharacteristics, setIsCharacteristics] = useState(true);
  const [isDescription, setIsDescription] = useState(false);

  const handleCharacteristicTabClick = () => {
    setIsCharacteristics(true);
    setIsDescription(false);
  };

  const handleDescriptionTabClick = () => {
    setIsCharacteristics(false);
    setIsDescription(true);
  };

  useEffect(() => {
    if (location.hash) {
      location.hash === HashKind.Characteristics ? handleCharacteristicTabClick() : handleDescriptionTabClick();
      tabRef.current?.scrollIntoView({behavior: PageScrollOptions.Smooth});
    }

  },[location.hash]);

  const {
    vendorCode,
    type,
    description,
    stringCount,
  } = guitar as GuitarType;

  return(
    <div className="tabs">
      <Link
        className={`button button--medium tabs__button ${!isCharacteristics && 'button--black-border'}`}
        onClick={handleCharacteristicTabClick}
        to="#characteristics"
      >Характеристики
      </Link>
      <Link
        className={`button button--medium tabs__button ${!isDescription && 'button--black-border'}`}
        onClick={handleDescriptionTabClick}
        to="#description"
      >Описание
      </Link>

      <div
        className="tabs__content"
        id={isCharacteristics ? HashKind.Characteristics : HashKind.Description}
        ref={tabRef}
      >
        {
          isCharacteristics
            ?
            <table className="tabs__table">
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{vendorCode}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{type}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{stringCount} струнная</td>
                </tr>
              </tbody>
            </table>
            :
            <p
              className={`tabs__product-description ${!isDescription && 'hidden'}`}
            >{description}
            </p>
        }
      </div>
    </div>
  );
}

export default Tabs;
