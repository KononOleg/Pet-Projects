import './Footer.scss';
import React from 'react';

export function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__container">
        <a className="github" href="https://github.com/KononOleg" target="_blank" style={{ backgroundImage: 'url(./assets/icons/github.svg)' }} rel="noreferrer">
          KononOleg
        </a>
        <a className="rss" href="https://rs.school/js/" target="_blank" style={{ backgroundImage: 'url(./assets/icons/rss.svg)' }} rel="noreferrer">
          <span className="rss__year"> 21</span>
        </a>
      </div>
    </footer>
  );
}
