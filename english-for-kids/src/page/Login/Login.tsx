import "./Login.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginRequest } from "../../shared/api";
import { setIsAutheticated } from "../../shared/store/reducers/isAutheticatedReducer";
import { IRootState } from "../../shared/store/store";

export function Login(): JSX.Element {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isWasAttempt, SetIUsWasAttempt] = React.useState(false);
  const dispatch = useDispatch();

  const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isAutheticated = useSelector((state: IRootState) => state.isAutheticated.isAutheticated);

  const logIn = async () => {
    const success = await loginRequest(login, password);
    if (success.success) {
      dispatch(setIsAutheticated(true));
    }
    SetIUsWasAttempt(true);
  };
  const redirectAutheticated = isAutheticated ? <Redirect to="/admin/categories" /> : <Redirect to="/" />;

  return (
    <>
      <div className="login__wrapper">
        <input type="text" className="login__input" onChange={changeLogin} placeholder="login" />
        <input type="text" className="login__input input_password" onChange={changePassword} placeholder="password" />
        <div className="login__buttons">
          <button className="login__button login__button_login" onClick={logIn}>
            Login
          </button>
          <button
            className="login__button login__button_cancel"
            onClick={() => {
              SetIUsWasAttempt(true);
            }}
          >
            cancel
          </button>
        </div>
      </div>

      {isWasAttempt ? redirectAutheticated : null}
    </>
  );
}
