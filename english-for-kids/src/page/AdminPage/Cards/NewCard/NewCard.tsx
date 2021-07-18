/* import "./Card.scss"; */
import React from "react";
import { createCard } from "../../../../shared/api";
import ICard from "../../../../shared/interfaces/ICard";

interface IProps {
  category: string;
  createNewCards: (card: ICard) => void;
}

export function NewCard(props: IProps): JSX.Element {
  const [word, setWord] = React.useState("");
  const [translation, setTranslation] = React.useState("");
  const [audio, setAudio] = React.useState("");
  const [image, setImage] = React.useState("");

  const [isEdit, setIsEdit] = React.useState(false);

  const { category } = props;

  const switchUpdateHandler = () => {
    setIsEdit(!isEdit);
    setImage("");
  };

  const changeNewWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };
  const changeNewTranslation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTranslation(e.target.value);
  };
  const changeNewAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) throw Error("error");
    const FIRST_ELEMENT = 0;
    const reader = new FileReader();
    reader.onload = () => {
      setAudio(reader.result as string);
    };
    reader.readAsDataURL(file[FIRST_ELEMENT]);
    e.target.value = "";
  };

  const changeNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) throw Error("error");
    const FIRST_ELEMENT = 0;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file[FIRST_ELEMENT]);
    e.target.value = "";
  };

  const createNewCardHandler = async () => {
    await createCard(category, word, translation, audio, image);
    switchUpdateHandler();
    props.createNewCards({
      word,
      translation,
      image,
      audio,
    });
  };

  return (
    <div className="card__wrapper">
      {!isEdit ? (
        <>
          <p className="card__title">create new word</p>
          <button className="category__button" onClick={switchUpdateHandler}>
            create
          </button>
        </>
      ) : (
        <>
          <input type="text" className="category__input card__input" onChange={changeNewWord} placeholder="word" />
          <input type="text" className="category__input card__input" onChange={changeNewTranslation} placeholder="translation" />

          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <p className="card__title">sound:</p>
            <input type="file" id="input_audio" className="card__file-input" onChange={changeNewAudio} />
            <label htmlFor="input_audio" className="card__file_upload">
              select file
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <p className="card__title">image:</p>
            <input type="file" id="input_image" className="card__file-input" onChange={changeNewImage} />
            <label htmlFor="input_image" className="card__file_upload">
              select file
            </label>
          </div>
          <div style={{ display: "flex" }}>
            <button className="category__button" onClick={switchUpdateHandler}>
              cancel
            </button>
            <button className="category__button" disabled={!word || !translation || !audio || !image} onClick={createNewCardHandler}>
              ok
            </button>
          </div>
        </>
      )}
    </div>
  );
}
