import "./Cards.scss";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { deleteCard, getPageCards, updateCard } from "../../../shared/api";
import { Card } from "./Card/Card.tsx";
import { NewCard } from "./NewCard/NewCard.tsx";
import ICard from "../../../shared/interfaces/ICard";

interface IParams {
  category: string;
}

type ComponentProps = RouteComponentProps<IParams>;

export function Cards(props: ComponentProps): JSX.Element {
  const [cards, setCards] = useState([] as ICard[]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const { category } = props.match.params;

  const updateCards = async () => {
    const pageCards = await getPageCards(category, page);
    setCards([...cards, ...pageCards]);
    setFetching(false);
  };

  const scrollHandler = () => {
    const SCREEN_HEIGHT = 100;
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < SCREEN_HEIGHT) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (fetching) {
      setPage(page + 1);
      updateCards();
    }
  }, [fetching]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const updateCardHandler = async (card: string, body: ICard) => {
    await updateCard(category, card, body);
  };

  const deleteCardHandler = async (word: string) => {
    await deleteCard(category, word);
    const newArray = cards;
    const removeCard = newArray.find((card: ICard) => card.word === word);
    if (!removeCard) throw Error("error");
    const cardIndex = newArray.indexOf(removeCard);
    const DELETE_COUNT = 1;
    newArray.splice(cardIndex, DELETE_COUNT);
    setCards([...newArray]);
  };
  const createNewCards = (card: ICard) => {
    setCards([
      ...cards,
      {
        word: card.word,
        translation: card.translation,
        audio: card.audio,
        image: card.image,
      },
    ]);
  };

  return (
    <div className="cards__wrapper">
      {cards.map((card, index) => (
        <Card word={card.word} translation={card.translation} audio={card.audio} image={card.image} updateCard={updateCardHandler} deleteCardHandler={deleteCardHandler} key={index} />
      ))}
      <NewCard category={category} createNewCards={createNewCards} />
    </div>
  );
}
