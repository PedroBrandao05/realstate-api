import express, { Request, Response } from 'express';
import cors from 'cors';
import IHTTPServer from '../../application/contracts/httpServer';
import { injectable } from 'inversify';
import 'reflect-metadata'

@injectable()
export default class ExpressAdapter implements IHTTPServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async (req: Request, res: Response) => {
      try {
        const output = await callback(req.params, req.body, req.headers, req.query);
        res.status(output.code).json(output.response);
      } catch (error: any) {

        res.status(error.code || 500).json({
          message: error.message,
        })
      }
    })
  }

  middleware(method: string, url: string, middleware: Function, callback: Function): void {
    this.app[method](url, middleware, async (req: Request, res: Response) => {
      try {
        const output = await callback(req.params, req.body, req.headers, req.query);
        res.status(output.code).json(output.response);
      } catch (error: any) {

        res.status(error.code || 500).json({
          message: error.message,
        })
      }
    })
  }
  
  listen(port: number, callback: () => void): void {
    this.app.listen(port, callback());
  }
}