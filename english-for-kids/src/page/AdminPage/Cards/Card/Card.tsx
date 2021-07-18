import "./Card.scss";
import React, { useEffect } from "react";
import { playAudio } from "../../../../shared/PlayAudio";
import ICard from "../../../../shared/interfaces/ICard";

interface IProps {
  word: string;
  translation: string;
  audio: string;
  image: string;

  updateCard: (card: string, body: ICard) => void;
  deleteCardHandler: (card: string) => void;
}

export function Card(props: IProps): JSX.Element {
  const [word, setWord] = React.useState(props.word);
  const [translation, setTranslation] = React.useState(props.translation);
  const [audio, setAudio] = React.useState(props.audio);
  const [image, setImage] = React.useState(props.image);

  const resetCard = () => {
    setWord(props.word);
    setTranslation(props.translation);
    setAudio(props.audio);
    setImage(props.image);
  };
  useEffect(() => {
    resetCard();
  }, [props.word]);

  const [isEdit, setIsEdit] = React.useState(false);

  const switchUpdateHandler = () => {
    setIsEdit(!isEdit);
  };

  const cancelChange = () => {
    switchUpdateHandler();
    resetCard();
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

  const playAudioHandler = () => {
    const NULL = "";
    if (audio !== NULL) playAudio(audio);
  };
  const updateCardHandler = () => {
    switchUpdateHandler();
    props.updateCard(props.word, {
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
          <p className="card__title">word: {word}</p>
          <p className="card__title">translation: {translation}</p>
          <p className="card__title">
            sound: <img className="card__volume-button" src="../../assets/icons/volume.png" alt="volume" onClick={playAudioHandler} />
          </p>
          <img className="card__image" src={image} alt="image" />

          <button className="category__button" onClick={switchUpdateHandler}>
            edit card
          </button>
          <span className="button_close" onClick={props.deleteCardHandler.bind(null, props.word)}></span>
        </>
      ) : (
        <>
          <input type="text" className="category__input card__input" defaultValue={word} onChange={changeNewWord} placeholder="word" />
          <input type="text" className="category__input card__input" defaultValue={translation} onChange={changeNewTranslation} placeholder="translation" />

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
          <img className="card__image" src={image} alt="image" />
          <div style={{ display: "flex" }}>
            <button className="category__button" onClick={cancelChange}>
              cancel
            </button>
            <button className="category__button" disabled={!word || !translation || !audio || !image} onClick={updateCardHandler}>
              ok
            </button>
          </div>
        </>
      )}
    </div>
  );
}
