import './MainCard.scss';
import React from 'react';

interface IProps {
  image: string;
  category: string;
  openCategory: (category: string) => void;
}

export function MainCard(props: IProps): JSX.Element {
  return (
    <div className="MainCard" style={{ backgroundImage: `url(./${props.image})` }} onClick={props.openCategory.bind(null, props.category)}>
      <p className="MainCard__info">{props.category}</p>
    </div>
  );
}
