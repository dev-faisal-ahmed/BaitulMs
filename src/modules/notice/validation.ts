import { z } from 'zod';
import { enumGenerator } from '../../helpers';
import { NoticeFor } from './constants';

const SAddNotice = z.object({
  title: z.string({ required_error: 'Tittle is required' }),
  description: z.string({ required_error: 'Description is required' }),
  noticeFor: enumGenerator(
    NoticeFor,
    `notice for is required and it has to be ${NoticeFor}`
  ),
});

export const NoticeValidation = { SAddNotice };

export type TAddNoticePayload = z.infer<typeof SAddNotice>;
