import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser');
import * as bodyParser from'body-parser';
import * as sassMiddleware from 'node-sass-middleware';
import * as AppRouter from './routes';
import AppRouter from "./routes/index";

class App {
  public express : express.Application;

  constructor(){
    this.express = express();
    this.view();
    this.middleware();
    this.routes();
  }

  private view() : void{
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'public')));
  }


  private middleware() : void {
    this.express.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(sassMiddleware({
      src: path.join(__dirname, 'public'),
      dest: path.join(__dirname, 'public'),
      indentedSyntax: true, // true = .sass and false = .scss
      sourceMap: true
    }));


    //Error
    // catch 404 and forward to error handler
    this.express.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    this.express.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }


  private routes() : void {
    let router = new AppRouter();
    app.use('/', router.index());
    app.use('/users', router.users());
  }

}

export default new App().express;

