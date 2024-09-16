import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { ConfigServer } from "./config/config-server.config";

import swaggerSpec from "./swagger";

class Server extends ConfigServer{
  public app: express.Application = express();
  private port: number = this.getNumberEnv("PORT");

  constructor(){
    super();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    this.listen();
    this.checkConnectionDatabase();
  }

  routers(): Array<express.Router> {
    return []
  }

  async checkConnectionDatabase(){
    await this.checkConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
        console.log("Server running in port: " + this.port);
    })
  }
}

new Server();