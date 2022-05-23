import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HashKind, NameSpace } from '../../../../const';
import { createMockState, mockGuitar } from '../../../../utils/mock-faker';
import Tabs from './tabs';

describe('Component: Tabs', () => {
  it('render correctly (default version)', () => {
    const FAKE_ID = [1];

    const mockState = createMockState();
    const fakeDescription = lorem.sentence();
    const fakeGuitarData = {
      ...mockGuitar(),
      id: FAKE_ID,
      description: fakeDescription,
    };

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        entities: {[String(FAKE_ID[0])]: fakeGuitarData},
        ids: FAKE_ID,
      }
    };
    const store = configureMockStore()(updatedState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${FAKE_ID}`]}>
          <Routes>
            <Route path='guitar/:id' element={<Tabs />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link', {name: /Характеристики/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Описание/i})).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.queryByText(fakeDescription)).not.toBeInTheDocument();
  });

  it('render correctly when description hash is active', () => {
    const FAKE_ID = [1];

    const mockState = createMockState();
    const fakeDescription = lorem.sentence();
    const fakeGuitarData = {
      ...mockGuitar(),
      id: FAKE_ID,
      description: fakeDescription,
    };

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        entities: {[String(FAKE_ID[0])]: fakeGuitarData},
        ids: FAKE_ID,
      }
    };
    const store = configureMockStore()(updatedState);

    // scrollIntoView is not implemented in jsdom
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function() {};

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${FAKE_ID}${HashKind.Description}`]}>
          <Routes>
            <Route path='guitar/:id' element={<Tabs />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link', {name: /Характеристики/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Описание/i})).toBeInTheDocument();
    expect(screen.queryByText(/Артикул/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Тип/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Количество струн/i)).not.toBeInTheDocument();
    expect(screen.getByText(fakeDescription)).toBeInTheDocument();
  });

  it('render correctly when characteristic hash is active', () => {
    const FAKE_ID = [1];

    const mockState = createMockState();
    const fakeDescription = lorem.sentence();
    const fakeGuitarData = {
      ...mockGuitar(),
      id: FAKE_ID,
      description: fakeDescription,
    };

    const updatedState = {
      ...mockState,
      [NameSpace.DataGuitars]: {
        ...mockState[NameSpace.DataGuitars],
        entities: {[String(FAKE_ID[0])]: fakeGuitarData},
        ids: FAKE_ID,
      }
    };
    const store = configureMockStore()(updatedState);

    // scrollIntoView is not implemented in jsdom
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function() {};

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/guitar/${FAKE_ID}${HashKind.Characteristics}`]}>
          <Routes>
            <Route path='guitar/:id' element={<Tabs />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link', {name: /Характеристики/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Описание/i})).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.queryByText(fakeDescription)).not.toBeInTheDocument();
  });
});
