import React from 'react';
import ReactDOM from 'react-dom';
import { Page } from './page/Page.tsx';
import { init } from './components/database/database';

window.onload = () => {
  init();
  const app = document.createElement('div');
  document.body.append(app);
  document.body.classList.add('body');
  app.classList.add('page__container');
  ReactDOM.render(<Page />, app);
};
