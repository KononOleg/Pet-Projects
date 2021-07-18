import "./Main.scss";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/Card/Card.tsx";
import { MainCard } from "../../components/MainCard/MainCard.tsx";
import { playCurrentAudio, startGame, clickCard } from "../../components/Game/Game";
import { FailureModal, SuccessModal } from "../../components/Game/EndGameModal/EndGameModal.tsx";
import { delay } from "../../shared/delay";
import { playAudio } from "../../shared/PlayAudio";
import { FailureStar, SuccessStar } from "../../components/Game/Stars/Stars.tsx";
import store from "../../shared/store";
import ICards from "../../shared/interfaces/ICards";
import ICard from "../../shared/interfaces/ICard";
import { setIsGame } from "../../shared/store/reducers/isGameReducer";
import { setActiveCategory } from "../../shared/store/reducers/activeCategoryReducer";
import { getAllCards } from "../../shared/api";
import { IRootState } from "../../shared/store/store";

interface IMainCard {
  image: string;
  category: string;
}

let countMistakes: number;

export function Main(): JSX.Element {
  const [Heart, setHeart] = React.useState([] as JSX.Element[]);
  const [Modal, setModal] = React.useState([] as JSX.Element[]);
  const [Cards, setCards] = React.useState([] as ICard[]);

  const [mainCards, setMainCards] = React.useState([] as { category: string; image: string }[]);

  const Category = useSelector((state: IRootState) => state.activeCategory.activeCategory);
  const dispatchCategory = useDispatch();

  const isGame = useSelector((state: IRootState) => state.isGame.isGame);
  const dispatchIsGame = useDispatch();

  const isGameMode = useSelector((state: IRootState) => state.isGameMode.isGameMode);

  React.useEffect(() => {
    setHeart([]);
  }, [isGame]);

  React.useEffect(() => {
    if (Category !== store.MAIN_PAGE) {
      const diffCards = store.allCards.find((card: ICards) => card.category === Category)?.data;
      if (!diffCards) throw Error("error");
      setCards(diffCards);
      store.cards = diffCards;
    } else {
      (async function fetchMyAPI() {
        const allCards = await getAllCards();
        const FIRTS_IMAGE = 0;
        setMainCards(allCards.map((category) => ({ category: category.category, image: category.data.length === 0 ? "./assets/icons/question.png" : category.data[FIRTS_IMAGE].image })));
      })();
    }
  }, [Category]);

  const startGameHandler = () => {
    startGame();
    countMistakes = 0;
    dispatchIsGame(setIsGame(true));
  };
  const clickCardHandler = async (setIsActive: Dispatch<SetStateAction<boolean>>, audio: string): Promise<void> => {
    const res = clickCard(audio);
    const PAUSE_AFTER_RIGHT_ASNWER = 1;
    const PAUSE_AFTER_GAME_OVER = 3;
    const NO_MISTAKES = 0;
    switch (res) {
      case store.RESULT_RIGHT:
        playAudio("./assets/audio/right.mp3");
        setHeart([<SuccessStar key={Heart.length++} />, ...Heart]);
        setIsActive(true);
        await delay(PAUSE_AFTER_RIGHT_ASNWER);
        playCurrentAudio();
        break;
      case store.RESULT_NOT_RIGHT:
        setHeart([<FailureStar key={Heart.length++} />, ...Heart]);
        countMistakes++;
        playAudio("./assets/audio/nope.mp3");
        break;
      case store.RESULT_COMPLETE:
        playAudio("./assets/audio/right.mp3");
        setHeart([<SuccessStar key={Heart.length++} />, ...Heart]);
        setIsActive(true);
        await delay(PAUSE_AFTER_RIGHT_ASNWER);
        if (countMistakes === NO_MISTAKES) {
          setModal([<SuccessModal key={1} />]);
          playAudio("./assets/audio/alright.mp3");
        } else {
          setModal([<FailureModal countMistakes={countMistakes} key={1} />]);
          playAudio("./assets/audio/failure.mp3");
        }
        await delay(PAUSE_AFTER_GAME_OVER);
        setModal([]);
        dispatchCategory(setActiveCategory(store.MAIN_PAGE));
        break;
      default:
        break;
    }
  };

  if (Category === store.MAIN_PAGE) {
    const renderCards = mainCards.map((mainCard: IMainCard, index: number) => <MainCard image={mainCard.image} category={mainCard.category} key={index} />);
    return <>{renderCards.length !== 0 ? <div className="cards">{renderCards}</div> : <p className="menu__card_empty">There are no cards</p>}</>;
  }

  const renderCards = Cards?.map((card: ICard, index: number) => (
    <Card text={card.word} image={card.image} audio={card.audio} translation={card.translation} clickCard={clickCardHandler} key={index} />
  ));
  const MODAL_EMPTY = 0;
  if (Modal.length !== MODAL_EMPTY) {
    return <>{Modal}</>;
  }
  return (
    <>
      {renderCards.length !== 0 ? (
        <>
          <div className="hearts__wrapper">{Heart}</div>
          <div className="cards">{renderCards}</div>
          <div className="start-game__wrapper" style={{ display: `${!isGameMode || isGame ? "none" : "flex"}` }}>
            <button className="button_control" onClick={startGameHandler}>
              <img src="/./assets/icons/play.png" style={{ width: "70px", height: "70px" }} />
            </button>
          </div>
          <div className="repeat_wrapper" style={{ display: `${isGame ? "flex" : "none"}` }}>
            <button className="button_control" onClick={playCurrentAudio}>
              <img src="/./assets/icons/repeat.png" style={{ width: "60px", height: "60px" }} />
            </button>
          </div>
        </>
      ) : (
        <p className="menu__card_empty">There are no cards in the category</p>
      )}
    </>
  );
}
