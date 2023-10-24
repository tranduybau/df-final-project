import { OpenAIMessage } from '@/services';

export const ReviewMessageRole = {
  USER: 'user',
  SYSTEM: 'system',
  ASSISTANT: 'assistant',
} as const;

export type ReviewMessageRoleUnion = typeof ReviewMessageRole[keyof typeof ReviewMessageRole];

export interface ReviewMessageMap {
  [pathName: string]: OpenAIMessage[]
}
