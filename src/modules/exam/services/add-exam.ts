import { ExamModel } from '../model';
import { TAddExamPayload } from '../validation';

export const AddExam = async (payload: TAddExamPayload) => {
  const newExam = await ExamModel.create(payload);
  return newExam;
};
