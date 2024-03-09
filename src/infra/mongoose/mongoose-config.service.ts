import { Injectable } from "@nestjs/common";

import {ConfigService} from "@nestjs/config";
import {MongooseOptionsFactory, MongooseModuleOptions} from "@nestjs/mongoose";

@Injectable() 
export class MongooseConfigService implements MongooseOptionsFactory{
    constructor(private config: ConfigService){}
   
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        const username = this.config.get("DATABASE_USER");
        const password = this.config.get("DATABASE_PASSWORD");
        const host = this.config.get("DATABASE_HOST");
        const port = this.config.get("DATABASE_PORT");
        const db = this.config.get("DATABASE_NAME");
        const isLocal = this.config.get("NODE_ENV") === "LOCAL";
        
        
        const uri = isLocal ? `mongodb://0.0.0.0:${port}/${db}` : `mongodb://localhost:27017/testdb`;
        
        return {
            uri
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        }

    }
}