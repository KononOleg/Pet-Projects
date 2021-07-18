import { combineReducers, createStore } from "redux";

import activeCategoryReducer from "./reducers/activeCategoryReducer";
import isAutheticatedReducer from "./reducers/isAutheticatedReducer";
import isGameModeReducer from "./reducers/isGameModeReducer";
import isGameReducer from "./reducers/isGameReducer";

const rootReducer = combineReducers({
  isAutheticated: isAutheticatedReducer,
  isGame: isGameReducer,
  activeCategory: activeCategoryReducer,
  isGameMode: isGameModeReducer,
});
export interface IRootState {
  isAutheticated: { isAutheticated: boolean };
  isGameMode: { isGameMode: boolean };
  isGame: { isGame: boolean };
  activeCategory: { activeCategory: string };
}

export const store = createStore(rootReducer);
