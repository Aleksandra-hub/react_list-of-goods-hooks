import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

type SortField = 'alphabet' | 'length' | '';
const SORT_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getSortedGoods(
  listOfGoods: string[],
  sortField: SortField,
  reverse: boolean,
): string[] {
  const sortedGoods: string[] = [...listOfGoods];

  if (sortField) {
    sortedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return goods1.localeCompare(goods2);

        case SORT_BY_LENGTH:
          return goods1.length - goods2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

function getReverseGoods(listOfGoods: string[]): string[] {
  return [...listOfGoods].reverse();
}

export const App: React.FC = () => {
  const initialGoods = [...goodsFromServer];
  const [goods, setGoods] = useState(initialGoods);
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isReverse, setReverse] = useState(false);

  //handlers

  const sortAlphabetically = () => {
    const sortedGoods = getSortedGoods(goods, SORT_ALPHABETICALLY, isReverse);

    setGoods(sortedGoods);
    setSortField(SORT_ALPHABETICALLY);
  };

  const sortByLength = () => {
    const sortedGoods = getSortedGoods(goods, SORT_BY_LENGTH, isReverse);

    setGoods(sortedGoods);
    setSortField(SORT_BY_LENGTH);
  };

  const reverseGoods = () => {
    const reversedGoods = getReverseGoods(goods);

    setGoods(() => reversedGoods);
    setReverse(!isReverse);
  };

  const reset = () => {
    setGoods(initialGoods);
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse === true ? false : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
