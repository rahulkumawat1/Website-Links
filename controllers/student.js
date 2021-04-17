const Section = require('../models/section');

exports.getHomePage = (req, res, next) => {
    Section.find()
        .then(sections => {
            res.render('home', {path: '/', sections: sections});
        })
}