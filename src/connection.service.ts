import { Injectable, OnModuleInit } from "@nestjs/common";
import mysql from "mysql2/promise";
import * as config from 'config'

const dbConfig = config.get('db');
@Injectable()
export class ConnectionService implements OnModuleInit {

    public CP:mysql.Pool ;

    constructor(){

    }

    async onModuleInit() {
    	this.CP = mysql.createPool({
            host: process.env.RDS_HOSTNAME || dbConfig.host,
            port: process.env.RDS_PORT || dbConfig.port,
            user: process.env.RDS_USERNAME || dbConfig.username,
            password: process.env.RDS_PASSWORD || dbConfig.password,
            database: process.env.RDS_DB_NAME || dbConfig.database,
            //connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT as string) ?? 50
        });

      console.log(`✅ START CONNECTION 🚀 `)
    };
}
