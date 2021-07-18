import "./Categories.scss";
import React, { useEffect, useState } from "react";
import { deleteCategory, getPageCategories } from "../../../shared/api";
import { Category } from "./Category/Category.tsx";
import { NewCategory } from "./NewCategory/NewCategory.tsx";
import { ICategory } from "../../../shared/interfaces/ICategory";

export function Categories(): JSX.Element {
  const [categories, setCategories] = React.useState([] as ICategory[]);
  const [page, setPage] = useState(1);

  const [fetching, setFetching] = useState(true);
  const updateCategories = async () => {
    const Pagecategories = await getPageCategories(page);
    setCategories([...categories, ...Pagecategories]);
    setFetching(false);
  };
  useEffect(() => {
    if (fetching) {
      setPage(page + 1);
      updateCategories();
    }
  }, [fetching]);

  const scrollHandler = () => {
    const SCREEN_HEIGHT = 100;
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < SCREEN_HEIGHT) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const createNewCategory = (newCategory: string) => {
    const EMPTY_CARDS = 0;
    setCategories([...categories, { category: newCategory, count: EMPTY_CARDS }]);
  };

  const deleteCategoryHandler = async (removeCategory: string) => {
    await deleteCategory(removeCategory);
    const newArray = categories;
    const remCategory = newArray.find((category) => category.category === removeCategory);
    if (!remCategory) throw Error("error");
    const categoryIndex = newArray.indexOf(remCategory);
    const DELETE_COUNT = 1;
    newArray.splice(categoryIndex, DELETE_COUNT);
    setCategories([...newArray]);
  };

  return (
    <div className="categories__wrapper">
      {categories.map((mainCard, index) => (
        <Category category={mainCard.category} countWords={mainCard.count} deleteCategoryHandler={deleteCategoryHandler} key={index} />
      ))}
      <NewCategory createNewCategory={createNewCategory} />
    </div>
  );
}
