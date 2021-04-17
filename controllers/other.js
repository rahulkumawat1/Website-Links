const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    const errFlash = req.flash('error');
    const errorMessage = errFlash.length>0 ? errFlash[0]: null;
    res.render('login', {path: '/login', errorMessage: errorMessage});
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            if(user){
                if(user.password != password){
                    req.flash('error', 'Email or Password is incorrect.');
                    return res.redirect('/login');
                }

                req.session.userId = user._id;
                req.session.loggedIn = true;
                req.session.user_t = user.type;
                req.session.save((err) => {
                    console.log(err);
                    if(user.type == 1)
                        res.redirect('/not-auth');
                    else if( user.type == 2)
                        res.redirect('/');
                    else 
                        res.redirect('/admin');

                })    
            }
            else{
                req.flash('error', 'Email or Password is incorrect.');
                return res.redirect('/login');
            }
        })
}

exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}

exports.getSignUp = (req, res, next) => {
    const errFlash = req.flash('error');
    const errorMessage = errFlash.length>0 ? errFlash[0]: null;
    res.render('signup', {path: '/signup', errorMessage: errorMessage});
};

exports.postSignUp = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            if(user){
                req.flash('error', 'User already exist.');
                return res.redirect('/signup');
            }
            else{
                const user = new User({email: email, password: password, type: 1});
                return user.save()
                    .then(result => {
                        res.redirect('/login');
                    })
            }
        })
}

exports.getNotAuth = (req, res, next) => {
    res.render('not-auth', {path: 'not-auth'});
}