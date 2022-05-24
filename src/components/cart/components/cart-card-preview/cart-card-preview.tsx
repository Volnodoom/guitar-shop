function CartCardPreview(): JSX.Element {
  return(
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>

      <div className="cart-item__image">
        <img
          src="/img/content/catalog-product-2.jpg"
          srcSet="/img/content/catalog-product-2@2x.jpg 2x"
          width="55"
          height="130"
          alt="ЭлектроГитара Честер bass"
        />
      </div>

      <div className="product-info cart-item__info">
        <p className="product-info__title">ЭлектроГитара Честер bass</p>
        <p className="product-info__info">Артикул: SO757575</p>
        <p className="product-info__info">Электрогитара, 6 струнная</p>
      </div>

      <div className="cart-item__price">17 500 ₽</div>
      <div className="quantity cart-item__quantity">

        <button className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>

        <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" />
        <button className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">17 500 ₽</div>
    </div>
  );
}

export default CartCardPreview;
