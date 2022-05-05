export const JPG_ENDING_FORMAT ='.jpg';
export const JPG_DOUBLE_DENSITY = '@2x.jpg 2x';
export const LOCAL_RU = 'ru-RU';
export const ONE = 1;
export const DOUBLE_STEP = 2;
export const REVIEW_SHOW_OFF_LIMITS = 3;
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
  Catalog: (pageNumber: number | string = ':pageNumber') => `catalog/page_${pageNumber}`,
  Guitar: (id: number | string = ':id') => `guitar/${id}`,
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
