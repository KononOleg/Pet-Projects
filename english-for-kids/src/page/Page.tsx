import './Page.scss';
import React from 'react';
import { Header } from './header/Header.tsx';
import { Main } from './main/Main.tsx';
import state from '../shared/state';
import { Footer } from './footer/Footer.tsx';

export function Page(): JSX.Element {
  const [isGameMode, setIsGameMode] = React.useState(false);
  const [isGame, setIsGame] = React.useState(false);
  const [category, setCategory] = React.useState(state.MAIN_PAGE);
  const [activeCategory, setActiveCategory] = React.useState(state.MAIN_PAGE);

  const setGame = (isGameValue: boolean): void => {
    setIsGame(!isGameValue);
    state.isGame = isGameValue;
  };
  const setModeGame = (): void => {
    setIsGameMode(!isGameMode);
    setGame(false);
  };

  const openCategory = (categoryValue: string): void => {
    setCategory(categoryValue);
    state.category = categoryValue;
    setGame(false);
    setActiveCategory(categoryValue);
  };

  return (
    <>
      <Header switchMode={setModeGame} openCategory={openCategory.bind(null)} activeCategory={activeCategory} />
      <main className="main">
        <Main isGameMode={isGameMode} category={category} openCategory={openCategory.bind(null)} isGame={isGame} setGame={setGame} />
      </main>
      <Footer />
    </>
  );
}
