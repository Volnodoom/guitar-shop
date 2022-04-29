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
  Catalog: '/catalog',
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
