import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { GuitarPluralRu, KindOfGuitars, NameSpace } from '../../../../../../const';
import GuitarKind from './guitar-kind';
import { createMockState } from '../../../../../../utils/mock-faker';
import { State } from '../../../../../../types/state.types';

describe('Component: GuitarKind', () => {
  it('render correctly', () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <GuitarKind />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByLabelText(GuitarPluralRu.acoustic)).toBeInTheDocument();
    expect(screen.getByLabelText(GuitarPluralRu.electric)).toBeInTheDocument();
    expect(screen.getByLabelText(GuitarPluralRu.ukulele)).toBeInTheDocument();
  });

  it('click on the unchecked label lead to mark this position checked', async () => {
    const mockState = createMockState();
    const mockStore = configureMockStore()(mockState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <GuitarKind />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByLabelText(GuitarPluralRu.acoustic));
    await waitFor(() => {expect(screen.getByLabelText(GuitarPluralRu.acoustic, {selector: 'input'})).toBeChecked();});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledTimes(2);});
    // await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledWith(addFilterByType(KindOfGuitars.Acoustic));});
    // expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
  });

  it('when store contain query params related to guitar kind, this labels must be checked', () => {
    const mockState = createMockState();
    const updatedState: State = {
      ...mockState,
      [NameSpace.QueryParams]: {
        ...mockState[NameSpace.QueryParams],
        filterByType: [KindOfGuitars.Acoustic]
      }
    };
    const mockStore = configureMockStore()(updatedState);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <GuitarKind />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(GuitarPluralRu.acoustic, {selector: 'input'})).toBeChecked();
  });

  it('when store contain query params related to guitar kind, click on it remove check', async () => {
    const mockState = createMockState();
    const updatedState: State = {
      ...mockState,
      [NameSpace.QueryParams]: {
        ...mockState[NameSpace.QueryParams],
        filterByType: [KindOfGuitars.Acoustic]
      }
    };
    const mockStore = configureMockStore()(updatedState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <GuitarKind />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByLabelText(GuitarPluralRu.acoustic));
    await waitFor(() => {expect(screen.getByLabelText(GuitarPluralRu.acoustic, {selector: 'input'})).not.toBeChecked();});
    await waitFor(() => {expect(mockStore.dispatch).toHaveBeenCalledTimes(2);});
  });
});
