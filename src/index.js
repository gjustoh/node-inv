const express = require('express');
const morgan = require('morgan');
const handlerbars = require('express-handlebars');
const flash = require('connect-flash');
const path = require('path');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');

//inicializacion
const app = express();
require('./lib/passport');
//configuracion
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlerbars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlerbars')

}));
app.set('view engine', '.hbs');
//middlewares
app.use(session({
    secret: 'grhabsmysession',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}));

app.use(flash());
app.use(morgan('dev'));

//permite aceptar desde los formularios datos que envia los usuarios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//global variables

app.use((req, res, next) => {
        app.locals.success = req.flash('guardado');
        app.locals.error = req.flash('error');
        app.locals.user = req.user;
        next();
    })
    //rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/roles', require('./routes/roles'));
app.use('/products', require('./routes/products'));
//public
app.use(express.static(path.join(__dirname, 'public')));
//comenzar server

app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});