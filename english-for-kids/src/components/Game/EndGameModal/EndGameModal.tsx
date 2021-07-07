import './EndGameModal.scss';
import React from 'react';

interface IProps {
  countMistakes: number;
}

export function SuccessModal(): JSX.Element {
  return (
    <div className="overlay">
      <h2 className="Modal__title">Alright</h2>
      <img className="successModal__img" src="./assets/images/Freddie_Mercury.png" alt="freddie mercury" />
    </div>
  );
}
export function FailureModal(props: IProps): JSX.Element {
  return (
    <div className="overlay">
      <h2 className="Modal__title">GAME OVER</h2>
      <p className="Modal__subtitle">error {props.countMistakes}</p>
    </div>
  );
}
