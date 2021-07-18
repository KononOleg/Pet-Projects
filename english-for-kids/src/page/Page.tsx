import "./Page.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import { Header } from "./header/Header.tsx";
import { Main } from "./main/Main.tsx";
import { Footer } from "./footer/Footer.tsx";
import { setIsGameMode } from "../shared/store/reducers/isGameModeReducer";
import { setIsGame } from "../shared/store/reducers/isGameReducer";
import { setActiveCategory } from "../shared/store/reducers/activeCategoryReducer";
import { AdminPage } from "./AdminPage/AdminPage.tsx";
import { Login } from "./Login/Login.tsx";
import { IRootState } from "../shared/store/store";

export function Page(): JSX.Element {
  const activeCategory = useSelector((state: IRootState) => state.activeCategory.activeCategory);
  const dispatchCategory = useDispatch();

  const isGameMode = useSelector((state: IRootState) => state.isGameMode.isGameMode);
  const dispatchIsGameMode = useDispatch();

  const dispatchIsGame = useDispatch();

  const setGame = (isGameValue: boolean): void => {
    dispatchIsGame(setIsGame(isGameValue));
  };
  const setModeGame = (): void => {
    dispatchIsGameMode(setIsGameMode(!isGameMode));
    setGame(false);
  };

  const openCategory = (categoryValue: string): void => {
    dispatchCategory(setActiveCategory(categoryValue));
    setActiveCategory(categoryValue);
  };

  React.useEffect(() => {
    setGame(false);
  }, [activeCategory]);

  return (
    <Router>
      <Route exact path="/">
        <Header switchMode={setModeGame} openCategory={openCategory} activeCategory={activeCategory} />
        <main className="main">
          <Main />
        </main>
      </Route>
      <Route exact path="/login">
        <main className="main">
          <Login />
        </main>
      </Route>
      <Route path="/admin" component={AdminPage} />
      <Footer />
    </Router>
  );
}
