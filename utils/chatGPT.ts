import { toast } from '@/components/ui/use-toast';

import { getToken } from '@/context/auth';
import { getChatCompletions } from '@/services';

export interface Choice {
  message: Message
  finish_reason: string
}

export interface Message {
  role: string
  content: string
}

export interface Usage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface GetChatGPTReviewPromise {
  choices: Choice[]
  model: string
  usage: Usage
  id: string
  object: string
  created: number
}

interface ContentFileParams {
  pathName: string
  branch: string
  fileName: string
}

export async function getContentFileRepository(params: ContentFileParams) {
  try {
    const {
      pathName, branch, fileName,
    } = params;

    const ENDPOINT = `${pathName}/${branch}/${fileName}`;

    const response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_CONTENT_API}/${ENDPOINT}`); // eslint-disable-line;
    const data = await response.text();

    if (data) {
      return data as string;
    }

    throw new Error('Something went wrong');
  } catch (error) {
    toast({
      role: 'error',
      title: 'ChatGPT has some error',
      description: 'Please try again later.',
    });
    return null;
  }
}

export async function getReviewFromChatGPT(prompt: string) {
  try {
    const data = {
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }],
    };

    const token = getToken();

    if (!token) throw new Error('Token is not found');

    const params = {
      authorization: `${token}`,
    };

    const response = await getChatCompletions(data, params);

    if (response) {
      toast({}).dismiss();

      return response?.choices?.[0]?.message?.content as string;
    }

    throw new Error('Something went wrong');
  } catch (error) {
    toast({
      role: 'error',
      title: 'ChatGPT has some error',
      description: 'Please try again later.',
    });
    return null;
  }
}
