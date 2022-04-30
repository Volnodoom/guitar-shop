
import { PagesName, StarSize } from '../../const';
import { Breadcrumbs, RatingStars } from '../common/common';
import { CardReview } from './components/components';

function CardDetailed():JSX.Element {
  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <Breadcrumbs pageContent={PagesName.Guitar.en}/>

        <div className="product-container">
          <img className="product-container__img" src="/img/content/catalog-product-2.jpg" srcSet="/img/content/catalog-product-2@2x.jpg 2x" width="90" height="235" alt="" />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">СURT Z30 Plus</h2>
            <div className="rate product-container__rating">
              <RatingStars type={StarSize.CardDetailed.name}/>
            </div>

            <div className="tabs">
              <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
              <a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
              <div className="tabs__content" id="characteristics">
                <table className="tabs__table">
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">SO754565</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">Электрогитара</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">6 струнная</td>
                    </tr>
                  </tbody>
                </table>
                <p className="tabs__product-description hidden">Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.</p>
              </div>
            </div>

          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">52 000 ₽</p>
            <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
          </div>
        </div>

        <section className="reviews">
          <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
          <CardReview />
          <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
        </section>
      </div>
    </main>
  );
}

export default CardDetailed;
