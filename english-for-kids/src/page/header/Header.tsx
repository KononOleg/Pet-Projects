import "./Header.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Switch } from "./switch/Switch.tsx";
import store from "../../shared/store";
import { setIsAutheticated } from "../../shared/store/reducers/isAutheticatedReducer";
import { getAllCards } from "../../shared/api";
import ICards from "../../shared/interfaces/ICards";

interface IProps {
  switchMode: () => void;
  openCategory: (cat: string) => void;
  activeCategory: string;
}

export function Header(props: IProps): JSX.Element {
  const [isBurgerActive, setIsBurgerActive] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setIsAutheticated(false));
    (async function fetchMyAPI() {
      const allCards = await getAllCards();
      store.allCards = allCards;
    })();
  }, []);

  const switchBurgerMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsBurgerActive(!isBurgerActive);
  };
  const openCategoryHandler = (category: string) => {
    setIsBurgerActive(false);
    props.openCategory(category);
  };
  const category = store.allCards.map((card: ICards) => card.category);
  return (
    <header className="header">
      <div className={`burger ${isBurgerActive ? "" : "burger_active"}`}>
        <a className={`nav__link ${props.activeCategory === store.MAIN_PAGE ? "nav__link_active" : ""}`} onClick={openCategoryHandler.bind(null, store.MAIN_PAGE)}>
          Mainpage
        </a>
        {category.map((item: string, index: number) => (
          <a className={`nav__link ${props.activeCategory === item ? "nav__link_active" : ""}`} onClick={openCategoryHandler.bind(null, item)} key={index}>
            {item}
          </a>
        ))}

        <Link to={"/login"} style={{ textDecoration: "none", border: "4px solid white", borderRadius: "15px" }}>
          {
            <p
              className="nav__link"
              onClick={() => {
                setIsBurgerActive(false);
              }}
            >
              Login
            </p>
          }
        </Link>
      </div>
      <div className={`${isBurgerActive ? "burger__overlay_active" : "burger__overlay"}`} onClick={switchBurgerMenu}></div>
      <button className="burger__button" onClick={switchBurgerMenu.bind(null)}>
        <span className={`burger__span ${isBurgerActive ? "burger__span_active" : ""}`}></span>
      </button>
      <h1 className="header__logo">English for kids</h1>
      <Switch switchMode={props.switchMode} />
    </header>
  );
}
