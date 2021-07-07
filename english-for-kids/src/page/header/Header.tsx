import './Header.scss';
import React from 'react';
import cards from '../../../public/cards';
import { Switch } from './switch/Switch.tsx';
import ICards from '../../shared/interfaces/ICards';
import state from '../../shared/state';

interface IProps {
  switchMode: () => void;
  openCategory: (cat: string) => void;
  activeCategory: string;
}

export function Header(props: IProps): JSX.Element {
  const [isBurgerActive, setIsBurgerActive] = React.useState(false);

  const switchBurgerMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsBurgerActive(!isBurgerActive);
  };
  const openCategoryHander = (category: string) => {
    setIsBurgerActive(false);
    props.openCategory(category);
  };
  const category = cards.map((card: ICards) => card.category);
  return (
    <header className="header">
      <div className={`burger ${isBurgerActive ? '' : 'burger_active'}`}>
        <a className={`nav__link ${props.activeCategory === state.MAIN_PAGE ? 'nav__link_active' : ''}`} onClick={openCategoryHander.bind(null, state.MAIN_PAGE)}>
          Mainpage
        </a>
        {category.map((item: string, index: number) => (
          <a className={`nav__link ${props.activeCategory === item ? 'nav__link_active' : ''}`} onClick={openCategoryHander.bind(null, item)} key={index}>
            {item}
          </a>
        ))}
        <a className={`nav__link ${props.activeCategory === state.STATS_PAGE ? 'nav__link_active' : ''}`} onClick={openCategoryHander.bind(null, state.STATS_PAGE)}>
          Stats
        </a>
      </div>
      <div className={`${isBurgerActive ? 'burger__overlay_active' : 'burger__overlay'}`} onClick={switchBurgerMenu}></div>
      <button className="burger__button" onClick={switchBurgerMenu.bind(null)}>
        <span className={`burger__span ${isBurgerActive ? 'burger__span_active' : ''}`}></span>
      </button>
      <h1 className="header__logo">English for kids</h1>
      <Switch switchMode={props.switchMode} />
    </header>
  );
}
