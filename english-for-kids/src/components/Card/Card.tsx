import "./Card.scss";
import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { playAudio } from "../../shared/PlayAudio";
import { IRootState } from "../../shared/store/store";

interface IProps {
  text: string;
  image: string;
  audio: string;
  translation: string;

  clickCard: (setIsActive: Dispatch<SetStateAction<boolean>>, audio: string, word: string) => void;
}

export function Card(props: IProps): JSX.Element {
  const [isFlip, setIsFlip] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const isGameMode = useSelector((state: IRootState) => state.isGameMode.isGameMode);
  const isGame = useSelector((state: IRootState) => state.isGame.isGame);

  React.useEffect(() => {
    setIsActive(false);
  }, [isGame]);

  const flip = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFlip(!isFlip);
  };

  return (
    <div
      className={`card__container ${isFlip ? "card_flip" : ""} ${isGameMode ? "card__container_isGame" : ""} ${isActive ? "card_right" : ""}`}
      onPointerLeave={isFlip ? () => setIsFlip(false) : undefined}
    >
      <div className="card">
        <div
          className="card__front"
          style={{ backgroundImage: `url(${props.image})` }}
          onClick={
            isGameMode
              ? props.clickCard.bind(null, setIsActive, props.audio, props.text)
              : () => {
                  playAudio(props.audio);
                }
          }
        >
          <div className="card__info">
            <p className="card__word "> {props.text}</p>
            <button className="button_flip" onClick={flip}>
              <img className="button-flip__img" src="./assets/icons/flip.png" alt="flip" />
            </button>
          </div>
        </div>
        <div className="card__back" style={{ backgroundImage: `url(${props.image})` }}>
          <div className="card__info">
            <p className="card__word "> {props.translation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
