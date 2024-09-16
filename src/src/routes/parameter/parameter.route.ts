import { ParameterController } from "../../controllers/parameter/parameter.controller";
import { BaseRouter } from "../base.router";

export class ParameterRouter extends BaseRouter<ParameterController>{

    constructor(){
        super(ParameterController);
    }

    routes(): void{
        
    }
}