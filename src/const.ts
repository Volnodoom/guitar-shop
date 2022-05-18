export const JPG_ENDING_FORMAT ='.jpg';
export const JPG_DOUBLE_DENSITY = '@2x.jpg 2x';
export const LOCAL_RU = 'ru-RU';
export const ONE = 1;
export const DOUBLE_STEP = 2;
export const REVIEW_SHOW_OFF_LIMITS = 3;
export const LIMIT_GUITARS_PER_PAGE = 9;
export const LIMIT_GUITARS_PER_PAGE_DOUBLE = 18;
export const BACKEND_URL = 'https://guitar-shop.accelerator.pages.academy';
export const REQUEST_TIMEOUT = 5000;
export const APP_IMG_BASE = 'content/catalog-product';
export const SERVER_IMG_BASE = 'guitar';
export const COUPLED_DATA = 'comments';
export const HEADER_TOTAL_NUMBER = 'x-total-count';
export const BAD_REQUEST = 400;
export const UNDEFINED_ERROR = 'Ваш запрос сталкнулся с проблемами. Пожалуйста, проверьте ваше интернет соединение и попробуйте повторить ваш запрос.';
export const LINK_CURRENT = 'link--current';
export const NAV_LINK = 'link main-nav__link';
export const CART_LINK = 'header__cart-link';
export const SCROLL_LIMIT = 250;

export const STRING_NUMBERS = [
  4,
  6,
  7,
  12,
] as const;

export const RATING_OPTIONS = [
  {
    rating: 5,
    value: 'Отлично',
  },
  {
    rating: 4,
    value: 'Хорошо',
  },
  {
    rating: 3,
    value: 'Нормально',
  },
  {
    rating: 2,
    value: 'Плохо',
  },
  {
    rating: 1,
    value: 'Ужасно',
  },
];

export const AppRoutes = {
  Root: '/',
  PseudoRoot: 'catalog',
  CatalogPage: (pageNumber: number | string = ':pageNumber') => `page/${pageNumber}`,
  CatalogPageAbsolute: (pageNumber: number | string = ':pageNumber') => `/catalog/page/${pageNumber}`,
  Guitar: (id: number | string = ':id') => `guitar/${id}`,
  GuitarAbsolute: (id: number | string = ':id') => `/catalog/guitar/${id}`,
  Cart: 'cart',
  NotExisted: '*',
} as const ;

export enum KindOfGuitars {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export const GuitarPluralRu: {
  [value in KindOfGuitars]: string
} = {
  [KindOfGuitars.Acoustic]: 'Акустические гитары',
  [KindOfGuitars.Electric]: 'Электрогитары',
  [KindOfGuitars.Ukulele]: 'Укулеле',
} as const;

export const GuitarSingleRu: {
  [key in KindOfGuitars]: string
} = {
  [KindOfGuitars.Acoustic]: 'Акустическая гитара',
  [KindOfGuitars.Electric]: 'Электрогитара',
  [KindOfGuitars.Ukulele]: 'Укулеле',
} as const;

export const StarSize = {
  CardPreview: {width: 12, height: 11, name: 'CardPreview'},
  CardDetailed: {width: 14, height: 14, name: 'CardDetailed'},
  ReviewCardDetailed: {width: 16, height: 16, name: 'ReviewCardDetailed'},
} as const;

export const PagesName = {
  Catalog: {ru: 'Каталог', en: 'Catalog'},
  Guitar: {ru: 'Товар', en: 'Guitar'},
  Cart: {ru: 'Корзина', en: 'Cart'},
} as const;

export const ReviewDateTimeFormat = {
  day: 'numeric',
  month: 'long',
} as const;

export const KeyBoardCode = {
  Esc: {version1: 'Esc', version2: 'Escape'},
} as const;

export const ReviewFormIdFields = {
  UserName: 'user-name',
  UserAdv: 'adv',
  UserDisAdv: 'disadv',
  UserComment: 'comment',
} as const;

export enum ModalStatus {
  Initial = 'initial',
  OpenReview = 'openReview',
  Close = 'close',
  Success = 'success',
  Fail = 'fail',
}

export enum ModalKind {
  Review = 'review',
  Null = 'null',
}

export enum KeyBoardNames {
  Tab = 'Tab',
  Shift = 'Shift',
}

export enum EventListenerType {
  KeyDown = 'keydown',
  KeyUp = 'keyup',
}

export enum NameSpace {
  DataGuitars = 'DATA_GUITARS',
  DataReviews = 'DATA_REVIEWS',
  QueryParams = 'QUERY_PARAMS',
}

export enum ApiAction {
  FetchGuitars = 'guitars/fetchGuitars',
  FetchOneGuitar = 'guitars/fetchOneGuitar',
  FetchReviews = 'reviews/fetchReviews',
  SaveComment = 'reviews/saveComment',
  GetProduct = 'data/fetchProduct',
}

export const ApiRoutes = {
  Guitars: '/guitars',
  Guitar: (id: number | string) => `/guitars/${id}`,
  Reviews: (id: number | string) => `/guitars/${id}/comments`,
  PostComment: '/comments',
  PostCoupon: '/coupons',
  PostOrder: '/orders',
} as const;

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export const QueryRoutes = {
  Name: 'name',
  Type: 'type',
  Sort: '_sort',
  Order: '_order',
  Start: '_start',
  End: '_end',
  Limit: '_limit',
  PriceStart: 'price_gte',
  PriceEnd: 'price_lte',
  Like: 'name_like',
  Embed: '_embed',
};

export enum SortingOrder {
  Increase  = 'asc',
  Decrease = 'desc',
}

export enum PageScrollOptions {
  Smooth = 'smooth',
  Start = 'start',
}

export enum HashKind {
  Characteristics = '#characteristics',
  Description = '#description'
}

export enum LogoPosition {
  Header = 'header',
  Footer = 'footer',
}

export const FooterSocialLinks = [
  {
    ref: 'https://www.skype.com/',
    text: 'skype',
  },
  {
    ref: 'https://www.vsco.co/',
    text: 'vsco',
  },
  {
    ref: 'https://www.pinterest.com/',
    text: 'pinterest',
  },
];
