import { Router } from 'express';

export default class UserRoute{
    public router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() : void {
        this.router.get("/", function (req, res, next) {
           res.render("index", {title: "user"});
           next();
        });

        this.router.get("/customer", function (req, res, next) {
            res.status(200).json({id: 1, name: 2});
        })
    }
}
