'use strict';

const AuthModel = require('../models/auth-model'),
      am = new AuthModel(),
      errors = require('../middlewares/errors'),
      fs = require('fs');


class AuthController {
  index(req, res, next) {

    res.render('index', {
      title: 'Vieweb',
      bodyClass: 'body-index'
    });

  }

  loginGet(req, res, next) {

    if (req.session.username) {
      res.redirect('/create-landing');
    } else {
      res.render('login', {
        title: 'Login',
        bodyClass: 'body-login'
     });

    }
    
  }

  loginPost(req, res, next) {
   let user = {
     useremail: req.fields.useremail,
     password: req.fields.password
    };

    //console.log(user);

    am.getUser(user, (docs) => {
      req.session.useremail = (docs != null) ? user.useremail : null;
      req.session.userDir = (docs !=null) ? docs.userDir : null;
      req.session.username = (docs != null) ? docs.username : null;
      
      console.log(req.session);
      console.log(req.session, '---', docs);

      return (req.session.useremail) 
        ? res.redirect(`/create-landing`) 
        : errors.http401(req, res, next) ;
    }); 
  }

  signupGet(req, res, next) {
    res.render('signup', {
      title: 'Sign Up',
      bodyClass: 'body-signup'
    });
  }

  signupPost(req, res, next) {
    let user = {
          user_id:0,
          username: req.fields.username,
          useremail: req.fields.useremail,
          password: req.fields.password,
          userDir: req.fields.userDir
        };
    am.setUSer(user, (docs) => {
      fs.mkdir(`${__dirname}/../public/dist/files/${user.userDir}`, { recursive: true }, (err) => {
        if(err) throw err; 
        res.redirect(`/login?message=El usuario ${user.username} ha sido creado`);
      });
     
    });
  }

  logOut(req, res, next) {
    req.session.destroy((err) => {
      return (err)
        ? errors.http500(req, res, next)
        : res.redirect('/');
    });
  }

  
  
}

module.exports = AuthController;
