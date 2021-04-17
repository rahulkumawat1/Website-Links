exports.isAdmin = (req, res ,next) => {

    if(!req.session.loggedIn || !(req.session.user_t == 3)){
        console.log('hello bhai');
        return res.status(404).render('error', {path: 'error'});
    }

    next();
}

exports.isStudent = (req, res ,next) => {

    if(!req.session.loggedIn || !(req.session.user_t == 2))
        return res.status(404).render('error', {path: 'error'});

    next();
}