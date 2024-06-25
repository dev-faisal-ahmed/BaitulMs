import { Response } from 'express';

type TSuccessResponse = { data: any; message: string; status: number };
type TErrorResponse = { error: any; message: string; status: number };

export const SendSuccessResponse = (
  res: Response,
  { status, data, message }: TSuccessResponse
) => {
  return res.status(status).json({ ok: true, message, data });
};

export const SendErrorResponse = (
  res: Response,
  { status, message, error }: TErrorResponse
) => {
  return res.status(status).json({ ok: false, message, error });
};
