import './Main.scss';
import React, { Dispatch, SetStateAction } from 'react';
import cards from '../../../public/cards';
import { Card } from '../../components/Card/Card.tsx';
import { MainCard } from '../../components/MainCard/MainCard.tsx';
import { playCurrentAudio, startGame, clickCard } from '../../components/Game/Game';
import { FailureModal, SuccessModal } from '../../components/Game/EndGameModal/EndGameModal.tsx';
import { delay } from '../../shared/delay';
import { playAudio } from '../../shared/PlayAudio';
import { FailureStar, SuccessStar } from '../../components/Game/Stars/Stars.tsx';
import state from '../../shared/state';
import ICards from '../../shared/interfaces/ICards';
import ICard from '../../shared/interfaces/ICard';
import { Stats } from '../stats/Stats.tsx';
import { getDiffWords, overrideData } from '../../components/database/database';

interface IMainCard {
  image: string;
  category: string;
}

let countMistakes: number;

interface IProps {
  isGameMode: boolean;
  category: string;
  isGame: boolean;
  openCategory: (category: string) => void;
  setGame: (isGame: boolean) => void;
}

export function Main(props: IProps): JSX.Element {
  const [Heart, setHeart] = React.useState([] as JSX.Element[]);
  const [Modal, setModal] = React.useState([] as JSX.Element[]);
  const [Cards, setCards] = React.useState([] as ICard[]);
  const [Category, setCategory] = React.useState(props.category);

  React.useEffect(() => {
    setHeart([]);
  }, [props.isGame]);

  React.useEffect(() => {
    state.cards = Cards;
  }, [Cards]);

  React.useEffect(() => {
    if (Category === state.REPEAT_PAGE) {
      (async function fetchMyAPI() {
        const diffWord = await getDiffWords();
        const diffCards = diffWord.map((card: { word: string; translation: string }) => ({
          word: card.word,
          translation: card.translation,
          image: `img/${card.word}.png`,
          audioSrc: `audio/${card.word}.mp3`,
        }));
        setCards(diffCards);
      }());
    } else if (Category !== state.MAIN_PAGE && Category !== state.STATS_PAGE) {
      const diffCards = cards.find((card: ICards) => card.category === Category)?.data;
      if (!diffCards) throw Error('error');
      setCards(diffCards);
    }
  }, [Category]);

  React.useEffect(() => {
    state.category = Category;
    setCategory(props.category);
  }, [props.category]);

  const startGameHandler = () => {
    props.setGame(true);
    startGame();

    countMistakes = 0;
  };
  const clickCardHandler = async (setIsActive: Dispatch<SetStateAction<boolean>>, audio: string, word: string): Promise<void> => {
    const res = clickCard(audio);
    const PAUSE_AFTER_RIGHT_ASNWER = 1;
    const PAUSE_AFTER_GAME_OVER = 3;
    const NO_MISTAKES = 0;
    switch (res) {
      case state.RESULT_RIGHT:
        overrideData(word, 'correct');
        playAudio('./assets/audio/right.mp3');
        setHeart([<SuccessStar key={Heart.length++} />, ...Heart]);
        setIsActive(true);
        await delay(PAUSE_AFTER_RIGHT_ASNWER);
        playCurrentAudio();
        break;
      case state.RESULT_NOT_RIGHT:
        overrideData(word, 'incorrect');
        setHeart([<FailureStar key={Heart.length++} />, ...Heart]);
        countMistakes++;
        playAudio('./assets/audio/nope.mp3');
        break;
      case state.RESULT_COMPLETE:
        overrideData(word, 'correct');
        playAudio('./assets/audio/right.mp3');
        setHeart([<SuccessStar key={Heart.length++} />, ...Heart]);
        setIsActive(true);
        await delay(PAUSE_AFTER_RIGHT_ASNWER);
        if (countMistakes === NO_MISTAKES) {
          setModal([<SuccessModal key={1} />]);
          playAudio('./assets/audio/alright.mp3');
        } else {
          setModal([<FailureModal countMistakes={countMistakes} key={1} />]);
          playAudio('./audio/failure.mp3');
        }
        await delay(PAUSE_AFTER_GAME_OVER);
        setModal([]);
        props.openCategory(state.MAIN_PAGE);
        break;
      default:
        break;
    }
  };

  if (props.category === state.MAIN_PAGE) {
    const FIRTS_IMAGE = 0;
    const mainCards = cards.map((card: ICards) => ({ category: card.category, image: card.data[FIRTS_IMAGE].image }));
    const remderCards = mainCards.map((mainCard: IMainCard, index: number) => <MainCard image={mainCard.image} category={mainCard.category} openCategory={props.openCategory} key={index} />);
    return <div className="cards">{remderCards}</div>;
  }

  if (props.category === state.STATS_PAGE) {
    return <Stats openCategory={props.openCategory} />;
  }

  if (props.category === state.REPEAT_PAGE) {
    const ZERO_COUNT_CARDS = 0;
    if (Cards.length === ZERO_COUNT_CARDS) {
      return <p className="diffCards_empty">There are not difficult words</p>;
    }
  }
  const renderCards = Cards?.map((card: ICard, index: number) => (
    <Card isGameMode={props.isGameMode} text={card.word} image={card.image} audio={card.audioSrc} translation={card.translation} clickCard={clickCardHandler} isGame={props.isGame} key={index} />
  ));
  const MODAL_EMPTY = 0;
  if (Modal.length !== MODAL_EMPTY) {
    return <>{Modal}</>;
  }
  return (
    <div>
      <div className="hearts__wrapper">{Heart}</div>
      <div className="cards">{renderCards}</div>
      <div className="start-game__wrapper" style={{ display: `${!props.isGameMode || !props.isGame ? 'none' : 'flex'}` }}>
        <button className="button_control" onClick={startGameHandler}>
          <img src="./assets/icons/play.png" style={{ width: '70px', height: '70px' }} />
        </button>
      </div>
      <div className="repeat_wrapper" style={{ display: `${props.isGame ? 'none' : 'flex'}` }}>
        <button className="button_control" onClick={playCurrentAudio}>
          <img src="./assets/icons/repeat.png" style={{ width: '60px', height: '60px' }} />
        </button>
      </div>
    </div>
  );
}
