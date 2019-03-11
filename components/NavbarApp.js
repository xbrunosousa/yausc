import React from 'react';

const NavbarApp = () => (
  <div className="NavbarApp">
    <img
      className="navbar-logo-img"
      src={require('./../assets/img/icon.png')}
      alt="Icon App"
    />
    <span className="navbar-brand-name">YAUSC</span>
  </div>
);

export default NavbarApp;
