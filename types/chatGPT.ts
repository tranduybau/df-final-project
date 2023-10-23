export const ReviewMessageRole = {
  USER: 'USER',
  BOT: 'BOT',
} as const;

export type ReviewMessageRoleUnion = typeof ReviewMessageRole.USER | typeof ReviewMessageRole.BOT;

export interface ReviewMessage {
  id: string
  message: string
  role: ReviewMessageRoleUnion
}

export interface ReviewMessageMap {
  [pathName: string]: ReviewMessage[]
}
