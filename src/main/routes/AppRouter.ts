import { Router } from 'express';
import UserRoute from "./UserRoute";


export default class AppRouter{
  private router : Router;

  constructor(){
    this.router = Router();

    this.router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
      next();
    });

    this.router.use('/users', new UserRoute().router);

    this.router.get('/about', function (req, res, next) {
      res.render('index', { title: 'About' });
      next();
    });


  }
}



