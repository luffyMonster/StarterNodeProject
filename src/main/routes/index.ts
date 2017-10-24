import { Router } from 'express';
import UserRoute from "./users";

export default class AppRouter{

  public index() : Router{
    let router = router;
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
      next();
    });
    return router;
  }

  public users(): Router{
    return new UserRoute().router;
  }

  //..
}



