import { create } from 'zustand';

import { toast } from '@/components/ui/use-toast';

import { removeDotGitURL } from '@/utils/common';

/**
 * @Type GetGithubRepositoryOverview
 * Use for api check GitHub repository is existing or not
 * */
export interface GitHubOverview {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Owner
  html_url: string
  description: any
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  has_discussions: boolean
  forks_count: number
  mirror_url: any
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: any
  allow_forking: boolean
  is_template: boolean
  web_commit_signoff_required: boolean
  topics: any[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  temp_clone_token: any
  network_count: number
  subscribers_count: number
}

export interface Owner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

interface GetGithubRepositoryOverview {
  isLoadingGithubRepositoryOverview: boolean
  actionGetGithubRepositoryOverview: (path: string) => Promise<GitHubOverview | null>
  overview: GitHubOverview | null
}

export const useGetGithubRepositoryOverview = create<GetGithubRepositoryOverview>((set) => ({
  isLoadingGithubRepositoryOverview: false,
  actionGetGithubRepositoryOverview: async (path) => {
    const newPath = removeDotGitURL(path);

    const ENDPOINT = `repos/${newPath}`;
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
export interface GitHubFileType {
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
    const newPath = removeDotGitURL(path);

    const ENDPOINT = `repos/${newPath}/git/trees/${defaultBranch}?recursive=1`;
    let response: GetGitHubRepositoryFilesPromise;

    try {
      set({ isLoading: true });

      response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API}/${ENDPOINT}`).then((res) => res.json() as Promise<GetGitHubRepositoryFilesPromise>);

      if (response?.sha) {
        // Get only .ts|.tsx|.js|.jsx|.html|.css|.scss files
        const filteredFiles = response.tree.filter((file) => /\.(ts|tsx|js|jsx|html|css|scss)$/.test(file.path));

        set({ files: filteredFiles, isLoading: false });
        return filteredFiles;
      }

      throw new Error('Something went wrong');
    } catch (error) {
      set({ isLoading: false });
      return [];
    }
  },
  files: [],
}));
