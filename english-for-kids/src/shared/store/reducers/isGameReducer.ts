const SET_ISGAME = "SET_ISGAME";

const defaultState = {
  isGame: false,
};

export default function isGameReducer(state = defaultState, action: { type: string; payload: boolean }): { isGame: boolean } {
  switch (action.type) {
    case SET_ISGAME:
      return {
        ...state,
        isGame: action.payload,
      };
    default:
      return state;
  }
}
interface IAction {
  type: string;
  payload: boolean;
}
export const setIsGame = (isGame: boolean): IAction => ({ type: SET_ISGAME, payload: isGame });
