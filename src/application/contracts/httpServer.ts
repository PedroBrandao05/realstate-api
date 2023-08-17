export default interface IHTTPServer {
    on(method: string, url: string, callback: Function): void;
    listen(port: number, callback?: () => void): void;
  }