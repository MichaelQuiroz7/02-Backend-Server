import express, { Application } from 'express';
import routesProducts from '../Routes/ProductRoute'
import routesUsers from '../Routes/UserRoute'
import cors from 'cors'
import sequelize from '../Db/connection';


class Server {
    private app: Application;
    private port?: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT /*|| '3001'*/;
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect(); 
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('This port ' + this.port

            );
        });
    }


    routes(){
        this.app.use('/api/products', routesProducts);
        this.app.use('/api/user', routesUsers);
    }


    middlewares(){

        this.app.use(express.json());

        //Configuración del cors
        this.app.use(cors());
    }

    async dbConnect(){
       
        try{
            await sequelize.sync();
            console.log('Database connected successfully');
        } catch(error){
            console.error('Error connecting to database:', error);
        }
    }
     


}

export default Server;