const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./models/user');
const isAuth = require('./middlewares/isAuth');
const adminRouter = require('./routers/admin');
const otherRouter = require('./routers/other');
const studentRouter = require('./routers/student');

const MONGODB_URI = process.env.MONGODB_URI;
const store = new MongoDBStore({
     uri: MONGODB_URI,
     collection: 'sessions'
});

app = express();

app.use(
    session(
        {
            secret: 'my secret', 
            resave: false, 
            saveUninitialized: false, 
            store: store
        }
    )
);

app.use(flash());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

    if(req.session.loggedIn){
        User.findById(req.session.userId)
            .then(user => {
                if(!user){
                    res.locals.auth = 0;
                    return req.session.destroy();
                }
                req.user = user;
                return res.locals.auth = user.type;
            })
            .then(result => next())
    }
    else{
        res.locals.auth = 0;
        next();
    }

});

app.use(otherRouter);
app.use('/admin', isAuth.isAdmin, adminRouter);
app.use(isAuth.isStudent, studentRouter);


app.use((req, res, next) => {
    res.render('error', {path: 'error'});
})

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        console.log("Connected!");
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    })