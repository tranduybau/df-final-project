import { create } from 'zustand';

import { toast } from '@/components/ui/use-toast';

/**
 * @Type GetGithubRepositoryOverview
 * Use for api check GitHub repository is existing or not
 * */
interface GitHubOverview {
  default_branch: string
  private: boolean
}

interface GetGithubRepositoryOverview {
  isLoadingGithubRepositoryOverview: boolean
  actionGetGithubRepositoryOverview: (path: string) => Promise<GitHubOverview | null>
  overview: GitHubOverview | null
}

export const useGetGithubRepositoryOverview = create<GetGithubRepositoryOverview>((set) => ({
  isLoadingGithubRepositoryOverview: false,
  actionGetGithubRepositoryOverview: async (path) => {
    const ENDPOINT = `repos/${path}`;
    let response;

    try {
      set({ isLoadingGithubRepositoryOverview: true });

      response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API}/${ENDPOINT}`).then((res) => res.json() as Promise<GitHubOverview>);

      if (response.default_branch) {
        toast({}).dismiss();

        set({ overview: response, isLoadingGithubRepositoryOverview: false });
        return response;
      }

      throw new Error('Something went wrong');
    } catch (error) {
      toast({
        role: 'error',
        title: 'GitHub repository not found',
        description: 'Please try again later.',
      });
      set({ isLoadingGithubRepositoryOverview: false });
      return null;
    }
  },
  overview: null,
}));

/**
 * @Type GitHubFileType
 * Use for api get GitHub files
 * */
interface GitHubFileType {
  'path': string
  'mode': string
  'type': string
  'sha': string
  'size': number
  'url': string
}

interface GetGitHubRepositoryFilesPromise {
  sha: string
  url: string
  tree: GitHubFileType[]
  truncated: boolean
}

interface GetGithubRepositoryFiles {
  isLoading: boolean
  actionGetGithubRepositoryFiles: (path: string, defaultBranch: string) => Promise<GitHubFileType[]>
  files: GitHubFileType[]
}

export const useGetRepositoryFiles = create<GetGithubRepositoryFiles>((set) => ({
  isLoading: false,
  actionGetGithubRepositoryFiles: async (path, defaultBranch) => {
    const ENDPOINT = `repos/${path}/git/trees/${defaultBranch}?recursive=1`;
    let response: GetGitHubRepositoryFilesPromise;

    try {
      set({ isLoading: true });

      response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API}/${ENDPOINT}`).then((res) => res.json() as Promise<GetGitHubRepositoryFilesPromise>);

      if (response?.sha) {
        set({ files: response.tree, isLoading: false });
        return response.tree;
      }

      throw new Error('Something went wrong');
    } catch (error) {
      set({ isLoading: false });
      return [];
    }
  },
  files: [],
}));
