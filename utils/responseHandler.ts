import { Response } from "express";

const successResponseHandler = (
  status: number,
  message: string,
  data?: string[],
  res?: Response
) => {
  res?.status(status || 200).json({
    status: true,
    message: message,
    data: data,
  });
};

export { successResponseHandler };
