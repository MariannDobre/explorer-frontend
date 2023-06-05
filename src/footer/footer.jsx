import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <div className='footer__container'>
      <div className='wave wave-1'></div>
      <div className='wave wave-2'></div>
      <div className='wave wave-3'></div>
      <div className='wave wave-4'></div>

      <div className='footer__container-brand'>
        <p className='footer__container-brand-logo'>Explorer</p>
        <p className='footer__container-brand-copy'>
          Copyright &copy; 2019 Explorer. All rights reserved.
        </p>
      </div>

      <div className='footer__nav'>
        <div className='footer__nav-privacy'>
          <p className='footer__nav-privacy-title'>Privacy</p>
          <p className='footer__nav-privacy-subtitle'>Check It</p>
        </div>

        <div className='footer__nav-contact'>
          <p className='footer__nav-contact-title'>Contact</p>
          <p className='footer__nav-contact-subtitle'>
            contact_explorer@gmail.com
          </p>
        </div>

        <div className='footer__nav-support'>
          <p className='footer__nav-support-title'>Support</p>
          <p className='footer__nav-support-subtitle'>How I Use</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
