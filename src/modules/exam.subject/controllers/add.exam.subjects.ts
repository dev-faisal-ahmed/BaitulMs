import { sendSuccessResponse } from '../../../helpers';
import { TryCatch } from '../../../utils';
import { ExamSubject } from '../model';
import { TAddExamSubjectsPayload } from '../validation';

export const AddExamSubjects = TryCatch(async (req, res) => {
  const payload: TAddExamSubjectsPayload = req.body;
  const result: string[] = [];
  const { subjects } = payload;

  for (const subject of subjects) {
    const isSubjectExist = await ExamSubject.findOne({
      ['class.general']: subject.class.general,
      ['class.arabic']: subject.class.arabic,
      name: subject.name,
      examId: subject.examId,
    });
    if (isSubjectExist) result.push(`${subject.name} already exist`);
    else {
      const status = await ExamSubject.create(subject);
      if (!status) result.push(`Failed to add ${subject.name}`);
      else result.push(`Successfully added ${subject.name}`);
    }
  }

  sendSuccessResponse(res, {
    status: 200,
    message: 'Subjects Added Successfully',
    data: result,
  });
});
