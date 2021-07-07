import './TableTitle.scss';
import React, { useState } from 'react';
import state from '../../../shared/state';

interface IProps {
  title: string;
  setOrderBy: (sortByValue: string) => void;
}

export function TableTitle(props: IProps): JSX.Element {
  const [isSorted, setIsSorted] = useState(false);
  const setSortOrder = state.orderBy === 'prev' ? '▲' : '▼';
  const setSortBy = state.sortBy === props.title ? setSortOrder : '';
  const setOrderByHandler = () => {
    props.setOrderBy(props.title);
    setIsSorted(true);
  };
  return (
    <div className="tableTitle" onClick={setOrderByHandler}>
      {props.title}
      <span className="tableTitle__span">{isSorted ? setSortBy : ''}</span>
    </div>
  );
}
