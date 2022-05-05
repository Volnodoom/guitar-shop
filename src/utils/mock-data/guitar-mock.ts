import faker from 'faker';

const guitar1 = {
  id:12,
  name:'Честер Bass',
  vendorCode: 'SO757575',
  type: 'electric',
  description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  previewImg: 'img/content/catalog-product-2.jpg',
  stringCount: 4,
  rating: 2,
  price: 7_500,
};

const guitar2 = {
  id:13,
  name: faker.address.city(),
  vendorCode:'DWE3423F',
  type: 'mechanical',
  description: faker.lorem.sentence(),
  previewImg: 'img/content/catalog-product-4.jpg',
  stringCount: 6,
  rating: 5,
  price: 12_843,
};

const guitar3 = {
  id: 14,
  name: faker.address.city(),
  vendorCode: 'QDCCM54263',
  type: 'glass',
  description: faker.lorem.sentence(),
  previewImg: 'img/content/catalog-product-8.jpg',
  stringCount: 7,
  rating: 4,
  price: 17_950,
};

export const basicGuitarMock = [guitar1, guitar2, guitar3];
