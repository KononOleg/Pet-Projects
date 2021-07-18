import React from "react";
import { createCategory } from "../../../../shared/api";

interface IProps {
  createNewCategory: (newCategory: string) => void;
}

export function NewCategory(props: IProps): JSX.Element {
  const [isEdit, setIsEdit] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState("");

  const switchUpdateHandler = () => {
    setIsEdit(!isEdit);
  };
  const changeNewCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const createCategoryHandler = async () => {
    await createCategory(newCategory);
    switchUpdateHandler();
    props.createNewCategory(newCategory);
  };

  return (
    <div className="category__wrapper">
      {!isEdit ? (
        <>
          <h3 className="category__title">create new category</h3>
          <button className="category__button" onClick={switchUpdateHandler}>
            create
          </button>
        </>
      ) : (
        <>
          <input type="text" className="category__input" onChange={changeNewCategory} placeholder="category Name" />
          <div className="category__buttons">
            <button className="category__button" onClick={switchUpdateHandler}>
              cancel
            </button>
            <button className="category__button" disabled={!newCategory} onClick={createCategoryHandler}>
              ok
            </button>
          </div>
        </>
      )}
    </div>
  );
}
