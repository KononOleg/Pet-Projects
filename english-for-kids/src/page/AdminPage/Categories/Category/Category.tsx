import "./Category.scss";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { updateCategory } from "../../../../shared/api";

interface IProps {
  category: string;
  countWords: number;
  deleteCategoryHandler: (category: string) => void;
}

export function Category(props: IProps): JSX.Element {
  const [isEdit, setIsEdit] = React.useState(false);
  const [category, setCategory] = React.useState(props.category);
  const resetCategory = () => {
    setCategory(props.category);
  };
  useEffect(() => {
    resetCategory();
  }, [props.category]);

  const switchUpdateHandler = () => {
    setIsEdit(!isEdit);
  };

  const cancelChange = () => {
    switchUpdateHandler();
    resetCategory();
  };

  const changeNewCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const updateCategoryHandler = async () => {
    switchUpdateHandler();
    await updateCategory(props.category, category);
  };

  return (
    <div className="category__wrapper">
      {!isEdit ? (
        <>
          <h3 className="category__title">{category}</h3>
          <p className="category__count-words">words: {props.countWords}</p>
          <span className="button_close" onClick={props.deleteCategoryHandler.bind(null, props.category)} />
          <div className="category__buttons">
            <button className="category__button" onClick={switchUpdateHandler}>
              update
            </button>
            {
              <NavLink to={`/admin/words/${category}`}>
                <button className="category__button">add word</button>
              </NavLink>
            }
          </div>
        </>
      ) : (
        <>
          <input type="text" className="category__input" defaultValue={category} onChange={changeNewCategory} />
          <p className="category__count-words">words: {props.countWords}</p>
          <div className="category__buttons">
            <button className="category__button" onClick={cancelChange}>
              cancel
            </button>
            <button className="category__button" disabled={!category} onClick={updateCategoryHandler}>
              ok
            </button>
          </div>
        </>
      )}
    </div>
  );
}
