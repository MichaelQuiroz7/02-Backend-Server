import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();



if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
    throw new Error("Fatal Error: missing environment variables");

}

const sequelize = new Sequelize(
    process.env.DB_NAME,  
    process.env.DB_USER,       
    process.env.DB_PASSWORD,    
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
    }
);

export default sequelize;


export class connection{
    private sequelize: Sequelize;
    private connected: boolean;

    constructor() {
    
        this.sequelize = sequelize;    
        this.connected = false;
    }

    async connect(): Promise<boolean> {
        try {
            await this.sequelize.authenticate();
            console.log('Conexión establecida correctamente.');
            this.connected = true;
            return true;
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            this.connected = false;
            return false;
        }
    }

    async disconnect(): Promise<boolean> {
        try {
            await this.sequelize.close();
            console.log('Conexión cerrada correctamente.');
            this.connected = false;
            return true;
        } catch (error) {
            console.error('Error al cerrar la conexión:', error);
            return false;
        }
    }

    isConnected(): boolean {
        return this.connected;
    }

    async executeQuery(query: string): Promise<any> {
        if (!this.connected) {
            throw new Error('No hay conexión activa a la base de datos.');
        }

        try {
            const result = await this.sequelize.query(query);
            return result;
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            throw error;
        }
    }
}
