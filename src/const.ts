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
export const UNDEFINED_ERROR = 'Возникли проблемы, при обработке вашего запроса. Пожалуйста, проверьте ваше интернет соединение и попробуйте повторить ваш запрос.';
export const LINK_CURRENT = 'link--current';
export const NAV_LINK = 'link main-nav__link';
export const CART_LINK = 'header__cart-link';
export const SCROLL_LIMIT = 250;
export const PRICE_MIN = 'priceMin';
export const PRICE_MAX = 'priceMax';
export const DELAY_IN_SERVER_REQUEST = 500;
export const ERROR_404 = '404.';
export const PAGE_NOT_FOUND = 'Page not found';
export const GENERAL_ERROR_MESSAGE = 'Проверьте правильность ввода запроса, наличие интернет соединения и повторите попытку. Если данная проблема повторилась, значит мы работаем над её устранением. Пожалуйста, повторите свой запрос позже.';
export const SEARCH_BAR_PLACEHOLDER = 'Что вы ищите?';

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
  CartAbsolute: '/catalog/cart',
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
  Enter: {version1: 'Enter', version2: 'NumpadEnter'},
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
  FetchUserSearch = 'guitars/fetchUserSearch',
  FetchPrice = 'guitars/fetchMinAndMaxPrice',
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
  StringNumber: 'stringCount',
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
} as const;

export enum SortingOrder {
  Increase  = 'asc',
  Decrease = 'desc',
}

export enum SortingSort {
  Price  = 'price',
  Popularity = 'rating',
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

export enum ReviewFormField {
  UserName = 'UserName',
  Advantage = 'Advantage',
  Disadvantage = 'Disadvantage',
  Comment = 'Comment',
  Rating = 'Rating',
}

export enum SortingDataset {
  ByPrice = 'by price',
  ByPopular = 'by popularity',
  ByOrderUp = 'by order up',
  ByOrderDown = 'by order down',
}

export const GuitarTypeStringNumberCombination: {[value in KindOfGuitars]: number[]}  = {
  [KindOfGuitars.Acoustic]: [6,7,12],
  [KindOfGuitars.Electric]: [4,6,7],
  [KindOfGuitars.Ukulele]: [4],
};
