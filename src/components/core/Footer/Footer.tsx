import { FunctionComponent } from 'react';

// import reactLogo from '~/src/assets/img/brands/react-logo.png';
// import tailwindLogo from '~/src/assets/img/brands/tailwind-logo.png';
// import firebaseLogo from '~/src/assets/img/brands/firebase-logo.png';

import './Footer.css';

// const footerCols = [
//   {
//     id: 0,
//     image: reactLogo,
//     title: 'react',
//     link: 'https://org',
//   },
//   {
//     id: 1,
//     image: tailwindLogo,
//     title: 'tailwind',
//     link: 'https://tailwindcss.com',
//   },
//   {
//     id: 2,
//     image: firebaseLogo,
//     title: 'firebase',
//     link: 'https://firebase.google.com',
//   },
// ];

const Footer: FunctionComponent = () => (
  <footer className="footer">
    {/* <p className="footer__made-with">Made with love</p>
    <div className="footer__content">
      {footerCols.map(({ id, title, link, image }) => (
        <div key={id} className="footer__col">
          <a rel="noreferrer" target="_blank" href={link}>
            <img title={title} className="footer__img" src={image} alt="react" />
          </a>
        </div>
      ))}
    </div> */}
    <section className="footer__copyright">
      <p className="footer__author">
        By <a href="https://jero.dev">jero.dev</a>
      </p>
    </section>
  </footer>
);

export default Footer;
