import { AuthorizationController } from "../../controllers/authorization/authorization.controller";
import { BaseRouter } from "../base.router";

export class AuthorizationRouter extends BaseRouter<AuthorizationController>{

    constructor(){
        super(AuthorizationController);
    }

    routes(): void{
        
    }
}