import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from'body-parser';
import * as sassMiddleware from 'node-sass-middleware';
import AppRouter from "./routes/AppRouter";

class App {
  public express : express.Application;

  constructor(){
    this.express = express();
    this.view();
    this.middleware();
    this.routes();
    this.error();
  }

  private view() : void{
    this.express.set('views', path.join(__dirname, 'views'));
    this.express.set('view engine', 'jade');
    this.express.use(express.static(path.join(__dirname, 'public')));
  }


  private middleware() : void {
    // this.express.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
  }


  private routes() : void {
    this.express.use(new AppRouter().router);
  }

  private error() : void {
    // Error
    // catch 404 and forward to error handler
    this.express.use(function(req, res, next) {
      let err : Error  = new Error('Not Found');
      err['status'] = 404;
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

}

export default App;

