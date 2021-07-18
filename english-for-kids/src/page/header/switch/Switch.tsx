import "./Switch.scss";
import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../shared/store/store";

interface IProps {
  switchMode: () => void;
}

export function Switch(props: IProps): JSX.Element {
  const isGameMode = useSelector((state: IRootState) => state.isGameMode.isGameMode);
  return (
    <label className="switch">
      <input type="checkbox" onChange={props.switchMode} checked={isGameMode}></input>
      <span className="slider"></span>
      <span className="switch__span span__train">train</span>
      <span className="switch__span span__play">play</span>
    </label>
  );
}
