import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Cards from './Cards';
import data from '../../data/tests-data.json';

const itemsData = data.items;

describe('Cards component', () => {
  it('should render the correct number of cards', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <Cards items={itemsData} />
      </Provider>
    );
    const renderedCards = getAllByTestId('card');

    expect(renderedCards.length).toEqual(itemsData.length);
  });

  it('should display correct cards descriptions', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Cards items={itemsData} />
      </Provider>
    );
    const descElement1 = getByText(/cat sleeping on bed/i);
    const descElement2 = getByText(/white butterfly resting on cat's nose/i);
    const descElement3 = getByText(
      /selective focus photography of orange and white cat on brown table/i
    );
    expect(descElement1).toBeInTheDocument();
    expect(descElement2).toBeInTheDocument();
    expect(descElement3).toBeInTheDocument();
  });

  it('should open a modal when a card is clicked', () => {
    const { getAllByTestId, getByTestId } = render(
      <Provider store={store}>
        <Cards items={itemsData} />
      </Provider>
    );
    const card = getAllByTestId('card')[0];
    fireEvent.click(card);
    const modal = getByTestId('modal-overlay');
    expect(modal).toBeInTheDocument();
  });

  it('should close the modal when the close button is clicked', () => {
    const { getAllByTestId, queryByTestId, getByLabelText } = render(
      <Provider store={store}>
        <Cards items={itemsData} />
      </Provider>
    );
    const card = getAllByTestId('card')[0];
    fireEvent.click(card);
    const closeButton = getByLabelText('Close');
    fireEvent.click(closeButton);
    const modal = queryByTestId('modal-overlay');
    expect(modal).toBeNull();
  });
});
