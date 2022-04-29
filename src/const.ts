export const AppRoutes = {
  Catalog: '/',
  Guitar: (id: number | string = ':id') => `guitar/${id}`,
  Cart: 'cart/',
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

export const STRING_NUMBERS = [
  4,
  6,
  7,
  12,
] as const;
