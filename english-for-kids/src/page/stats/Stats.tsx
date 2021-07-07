import './Stats.scss';
import React, { useEffect, useState } from 'react';
import { readAll, resetData } from '../../components/database/database';
import state from '../../shared/state';
import { TableTitle } from './TableTitle/TableTitle.tsx';
import { IWord } from '../../shared/interfaces/IWord';

interface IProps {
  openCategory: (category: string) => void;
}

export function Stats(props: IProps): JSX.Element {
  const [cards, setCards] = useState([] as IWord[]);
  const [sortOrder, setSortOrder] = useState(state.orderBy);
  const [sortBy, setSortBy] = useState(state.sortBy);

  const setOrderBy = (sortByValue: string): void => {
    const ASCENDING_ORDER = 'prev';
    const DESCENDING_ORDER = 'next';
    state.orderBy = state.orderBy === ASCENDING_ORDER ? DESCENDING_ORDER : ASCENDING_ORDER;
    state.sortBy = sortByValue;
    setSortOrder(state.orderBy);
    setSortBy(sortByValue);
  };

  useEffect(() => {
    (async function fetchMyAPI() {
      setCards(await readAll(state.sortBy, state.orderBy));
    }());
  }, [sortBy, sortOrder]);
  return (
    <>
      <button
        className="stats__button"
        onClick={() => {
          resetData();
          setOrderBy('category');
        }}
      >
        Reset
      </button>
      <button className="stats__button" onClick={props.openCategory.bind(null, state.REPEAT_PAGE)}>
        Train difficult
      </button>
      <div className="statsTable">
        <>
          <TableTitle title={'category'} setOrderBy={setOrderBy} />
          <TableTitle title={'word'} setOrderBy={setOrderBy} />
          <TableTitle title={'translation'} setOrderBy={setOrderBy} />
          <TableTitle title={'trained'} setOrderBy={setOrderBy} />
          <TableTitle title={'correct'} setOrderBy={setOrderBy} />
          <TableTitle title={'incorrect'} setOrderBy={setOrderBy} />
          <TableTitle title={'percent'} setOrderBy={setOrderBy} />
        </>
        {cards.map((card: IWord, index: number) => (
          <React.Fragment key={index}>
            <div className="tableItem" key={`${index} category`}>
              {card.category}
            </div>
            <div className="tableItem" key={`${index} word`}>
              {card.word}
            </div>
            <div className="tableItem" key={`${index} translation`}>
              {card.translation}
            </div>
            <div className="tableItem" key={`${index} trained`}>
              {card.trained}
            </div>
            <div className="tableItem" key={`${index} correct`}>
              {card.correct}
            </div>
            <div className="tableItem" key={`${index} incorrect`}>
              {card.incorrect}
            </div>
            <div className="tableItem" key={`${index} percent`}>
              {card.percent}
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
