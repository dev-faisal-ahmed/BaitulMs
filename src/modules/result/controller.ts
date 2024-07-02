import { SendSuccessResponse } from '../../utils/helpers';
import { TryCatch } from '../../utils/try-catch';
import { ResultService } from './services';

const AddResult = TryCatch(async (req, res) => {
  const result = await ResultService.AddResult(req.body);

  SendSuccessResponse(res, {
    status: 200,
    message: 'Course successfully graded',
    data: result,
  });
});

export const ResultController = { AddResult };
