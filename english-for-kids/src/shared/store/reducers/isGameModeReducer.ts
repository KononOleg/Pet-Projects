const SET_ISGAMEMODE = "SET_ISGAMEMODE";

const defaultState = {
  isGameMode: false,
};

export default function isGameModeReducer(state = defaultState, action: { type: string; payload: boolean }): { isGameMode: boolean } {
  switch (action.type) {
    case SET_ISGAMEMODE:
      return {
        ...state,
        isGameMode: action.payload,
      };
    default:
      return state;
  }
}
interface IAction {
  type: string;
  payload: boolean;
}

export const setIsGameMode = (isGameMode: boolean): IAction => ({ type: SET_ISGAMEMODE, payload: isGameMode });
