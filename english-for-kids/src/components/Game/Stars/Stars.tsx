import './Stars.scss';
import React from 'react';

export function SuccessStar(): JSX.Element {
  return <img className="star" src="./assets/images/success-star.png" />;
}
export function FailureStar(): JSX.Element {
  return <img className="star" src="./assets/images/failure-star.png" />;
}
