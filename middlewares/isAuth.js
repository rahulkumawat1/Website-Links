exports.isAdmin = (req, res ,next) => {

    if(!req.session.loggedIn || !req.user || !(req.user.type == 3)){
        return res.status(404).render('error', {path: 'error'});
    }

    next();
}

exports.isStudent = (req, res ,next) => {

    if(!req.session.loggedIn || !req.user || !(req.user.type == 2))
        return res.status(404).render('error', {path: 'error'});

    next();
}