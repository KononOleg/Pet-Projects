import './Switch.scss';
import React from 'react';

interface IProps {
  switchMode: () => void;
}

export function Switch(props: IProps): JSX.Element {
  return (
    <label className="switch">
      <input type="checkbox" onChange={props.switchMode}></input>
      <span className="slider"></span>
      <span className="switch__span span__train">train</span>
      <span className="switch__span span__play">play</span>
    </label>
  );
}
