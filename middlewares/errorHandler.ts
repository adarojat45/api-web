import { Request, Response, NextFunction } from "express";

class HttpException extends Error {
  code: number;
  name: string;
  message: string;

  constructor(code: number, name: string, message: string) {
    super(message);
    this.code = code;
    this.name = name;
    this.message = message;
  }
}

const errorHandler = (
  err: HttpException,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  let code: number = err.code || 500;
  let name: string = err.name || "InternalServerError";
  let messages: string[] = err.message ? [err.message] : [];

  switch (err.name) {
    case "NotFound":
      //  put your code here
      break;

    default:
      messages = ["Internal server error"];
      break;
  }

  res.status(code).json({
    code,
    name,
    messages,
  });
};

export default errorHandler;
