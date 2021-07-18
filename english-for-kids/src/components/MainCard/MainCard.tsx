import "./MainCard.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { setActiveCategory } from "../../shared/store/reducers/activeCategoryReducer";

interface IProps {
  image: string;
  category: string;
}

export function MainCard(props: IProps): JSX.Element {
  const dispatchCategory = useDispatch();

  return (
    <div
      className="MainCard"
      style={{ backgroundImage: `url(${props.image})` }}
      onClick={() => {
        dispatchCategory(setActiveCategory(props.category));
      }}
    >
      <p className="MainCard__info">{props.category}</p>
    </div>
  );
}
