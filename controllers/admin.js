const Section = require('../models/section');
const User = require('../models/user');

exports.getHomePage = (req, res, next) => {
    Section.find()
        .then(sections => {
            res.render('home', { path: '/', sections: sections });
        })
};

exports.getAddLink = (req, res, next) => {
    res.render('add-link', { path: '/add-link' });
};

exports.postAddLink = (req, res, next) => {
    const sectionName = req.body.section.toLowerCase();
    const text = req.body.text;
    const link = req.body.link;
    const desc = req.body.desc;

    Section.findOne({ sectionName: sectionName })
        .then(section => {
            if (!section) {
                const section1 = new Section({ sectionName: '', links: [] });
                section1.sectionName = sectionName;
                section1.links.push({ text: text, link: link, desc: desc });
                return section1.save()
            }
            else {
                console.log(section);
                section.links.push({ text: text, link: link, desc: desc });
                return section.save()
            }

        })
        .then(result => {
            res.redirect('/admin/');
        }
        )
        .catch(err => console.log(err));
}

exports.getEditLink = (req, res, next) => {
    const id = req.params.id;
    const index = parseInt(req.params.index);

    Section.findById(id)
        .then(section => {
            const link = section.links[index];
            res.render('edit-link', { link: link, sectionName: section.sectionName, index: index });
        })
}

exports.postEditLink = (req, res, next) => {
    const sectionName = req.body.section.toLowerCase();
    const text = req.body.text;
    const link = req.body.link;
    const desc = req.body.desc;
    const index = req.body.index;
    const oldSectionName = req.body.oldSectionName;

    if (sectionName == oldSectionName) {
        Section.findOne({ sectionName: sectionName })
            .then(section => {
                section.links[index].text = text;
                section.links[index].link = link;
                section.links[index].desc = desc;
                return section.save();
            })
            .then(result => res.redirect('/admin/'))
            .catch(err => console.log(err))
    }
    else {
        Section.findOne({ sectionName: oldSectionName })
            .then(section => {
                section.links = section.links.filter((link, i) => i != index);
                if (section.links.length == 0)
                    return section.delete();
                return section.save();
            })
            .then(result => {
                Section.findOne({ sectionName: sectionName })
                    .then(section => {
                        section.links.push({ text: text, link: link, desc: desc });
                        return section.save();
                    })
                    .then(result => res.redirect('/admin/'))
            })
            .catch(err => console.log(err))
    }

    Section.findOne({ sectionName: sectionName })
        .then(section => {
            if (!section) {
                const section1 = new Section({ sectionName: '', links: [] });
                section1.sectionName = sectionName;
                section1.links.push({ text: text, link: link, desc: desc });
                return section1.save()
            }
            else {
                section.links[index].text = text;
                section.links[index].link = link;
                section.links[index].desc = desc;
                return section.save()
            }

        })
        .then(result => {
            res.redirect('/admin/');
        }
        )
        .catch(err => console.log(err));
}

exports.getDeleteLink = (req, res, next) => {
    const id = req.params.id;
    const index = req.params.index;

    Section.findById(id)
        .then(section => {
            section.links = section.links.filter((link, i) => i != index)
            if (section.links.length == 0)
                return section.delete();
            return section.save();
        })
        .then(result => res.redirect('/admin/'));
}

exports.getDeleteSection = (req, res, next) => {
    const id = req.params.id;

    Section.findByIdAndDelete(id)
        .then(result => res.redirect('/admin/'));
}

exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => {
            res.render('users', { users: users });
        })
}

exports.postUserType = (req, res, next) => {
    const id = req.params.id;
    const userType = parseInt(req.body.userType);

    User.findById(id)
        .then(user => {
            if (user.email == 'rahul@gmail.com') {
                return res.redirect('/admin/users');
            }
            user.type = userType;
            user.save()
                .then(result => res.redirect('/admin/users'));
        })
}

exports.getDltUser = (req, res, next) => {
    const id = req.params.id;

    User.findById(id)
        .then(user => {
            if (user.email != 'rahul@gmail.com') {
                return user.delete();
            }
            return null;
        })
        .then(result => res.redirect('/admin/users'))

}
