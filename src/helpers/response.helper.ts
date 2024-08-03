import { Response } from 'express';

type TMeta = { page: number; limit: number; total: number; totalPages: number };

type TSuccessResponse = {
  data: any;
  message: string;
  status: number;
  meta?: TMeta;
};

type TErrorResponse = { error: any; message: string; status: number };

export const sendSuccessResponse = (
  res: Response,
  { status, meta, data, message }: TSuccessResponse
) => {
  return res.status(status).json({ ok: true, message, meta, data });
};

export const sendErrorResponse = (
  res: Response,
  { status, message, error }: TErrorResponse
) => {
  return res.status(status).json({ ok: false, message, error });
};
