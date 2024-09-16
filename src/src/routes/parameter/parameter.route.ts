import { ParameterController } from "../../controllers/parameter/parameter.controller";
import { TokenMiddleware } from "../../middlewares/token.middleware";
import { BaseRouter } from "../base.router";

export class ParameterRouter extends BaseRouter<ParameterController, undefined, TokenMiddleware>{

    constructor(){
        super(ParameterController, undefined, TokenMiddleware);
    }

    routes(): void{

        /**
         * @swagger
         * /api/parameter/get-types-document:
         *  get:
         *      summary: Get Nearby Places
         *      security:
         *          - apiAuth: []
         *      tags: 
         *          - Parameter
         *      responses:
         *          200:
         *              description: Successful process
         *          401:
         *              description: Unauthorized
         *          500:
         *              description: Internal server error
         */
        this.router.get(
            '/parameter/get-types-document',
            (req, res, next) => [this.securityMiddleware?.validateToken(req, res, next)],
            (req, res) => this.controller.getTypesDocument(req, res)
        );
    }
}