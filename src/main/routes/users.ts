import { Router } from 'express';

export default class UserRoute{
    public router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() : void {
        this.router.get("/user", function (req, res, next) {
           res.status(200).json({id: 1, name: "Luffy"});
           next();
        });
    }
}
