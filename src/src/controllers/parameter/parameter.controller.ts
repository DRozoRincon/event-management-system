import { Request, Response } from "express";
import { HttpResponse } from "../../config/http.response";
import { TypeDocumentService } from "../../models/parameter/type-document.service";


export class ParameterController {

    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly typeDocumentService: TypeDocumentService = new TypeDocumentService()
    ){}

    async getTypesDocument(req: Request, res: Response) {
        try{
          const typesDocument = await this.typeDocumentService.getTypesDocument();
    
          return this.httpResponse.Ok(res, typesDocument);
        }catch(error){
          console.error(error);
    
          return this.httpResponse.Error(res);
        }
    }
}