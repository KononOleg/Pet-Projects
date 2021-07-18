const SET_ISAUTHETICATED = "SET_ISAUTHETICATED";

const defaultState = {
  isAutheticated: false,
};

export default function isAutheticatedReducer(state = defaultState, action: { type: string; payload: boolean }): { isAutheticated: boolean } {
  switch (action.type) {
    case SET_ISAUTHETICATED:
      return {
        ...state,
        isAutheticated: action.payload,
      };
    default:
      return state;
  }
}
interface IAction {
  type: string;
  payload: boolean;
}
export const setIsAutheticated = (isAutheticated: boolean): IAction => ({ type: SET_ISAUTHETICATED, payload: isAutheticated });
