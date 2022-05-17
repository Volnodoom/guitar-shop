import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { PagesName } from '../../../const';
import { State } from '../../../types/state.types';
import { createMockState } from '../../../utils/mock-faker';
import Breadcrumbs from './breadcrumbs';

const mockState = createMockState();
const mockStore = configureMockStore<State>()(mockState);
const CATALOG_PAGE_LINKS_NUMBER = 2;
const OTHER_PAGES_LINES_NUMBER = 3;
const productTitle = lorem.word();

describe('Component: Breadcrumbs', () => {
  it('render correctly breadcrumbs on catalog page', () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Breadcrumbs pageContent={PagesName.Catalog.en} />
        </Provider>
      </MemoryRouter>
    );

    const links = screen.queryAllByRole('link');

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(links.length).toBe(CATALOG_PAGE_LINKS_NUMBER);
  });

  it('render correctly breadcrumbs on cart page', () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Breadcrumbs pageContent={PagesName.Cart.en} />
        </Provider>
      </MemoryRouter>
    );

    const links = screen.queryAllByRole('link');

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Корзина/i)).toBeInTheDocument();
    expect(links.length).toBe(OTHER_PAGES_LINES_NUMBER);
  });

  it('render correctly breadcrumbs on product page', () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Breadcrumbs pageContent={PagesName.Guitar.en} productTitle={productTitle}/>
        </Provider>
      </MemoryRouter>
    );

    const links = screen.queryAllByRole('link');

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(productTitle)).toBeInTheDocument();
    expect(links.length).toBe(OTHER_PAGES_LINES_NUMBER);
  });

});
