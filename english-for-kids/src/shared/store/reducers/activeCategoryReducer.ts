import store from "../../store";

const SET_CATEGORY = "SET_CATEGORY";

const defaultState = {
  activeCategory: store.MAIN_PAGE,
};

export default function activeCategoryReducer(state = defaultState, action: { type: string; payload: string }): { activeCategory: string } {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
      };
    default:
      return state;
  }
}

interface IAction {
  type: string;
  payload: string;
}

export const setActiveCategory = (activeCategory: string): IAction => ({ type: SET_CATEGORY, payload: activeCategory });
