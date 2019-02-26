import LandingPage from './landing_page.js';
import Toolbar from './toolbar.js';




  let landingPage = new LandingPage('My first landing', 1, 'admin', document.querySelector('#workboard'), Toolbar),
    config = {

  };
    
  landingPage.init();

