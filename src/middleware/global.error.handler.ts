import { ErrorRequestHandler } from 'express';
import { sendErrorResponse } from '../helpers';
import { NODE_ENV } from '../config';

export const GlobalErrorHandler: ErrorRequestHandler = (err, _, res, __) => {
  let status: number = err.status || 500;
  let message: string = err.message || 'something went wrong';

  if (err.name === 'ZodError') {
    message = err.issues.reduce(
      (
        msg: string,
        issue: { message: string; path: any[]; received: string },
        index: number
      ) => {
        msg +=
          issue.received === 'undefined'
            ? issue.message
            : `In ${issue.path[0]} ${issue.message}`;
        msg += index !== err.issues.length - 1 ? ' || ' : '';
        return msg;
      },
      ''
    );
  }

  return sendErrorResponse(res, {
    message,
    status,
    error: NODE_ENV === 'development' ? err : {},
  });
};
