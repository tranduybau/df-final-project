import React from 'react';

import Icon from '@/components/common/icon';
import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';

import { GitHubOverview } from '@/zustand/useGetGithubRepository';

export interface ReviewHeaderProps {
  repositoryOverView: GitHubOverview;
  onSearchFiles: (value: string) => void;
}

export default function ReviewHeader({ repositoryOverView, onSearchFiles }: ReviewHeaderProps) {
  if (!repositoryOverView) return null;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, private: isPrivateRepository, default_branch } = repositoryOverView;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchFiles(event.target.value);
  };

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center rounded-full bg-slate-100 p-1 dark:bg-slate-500">
          {isPrivateRepository ? <Icon name="lock-keyhole" className="h-5 w-5" /> : <Icon name="globe-2" className="h-5 w-5" />}
        </div>

        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-500">
          <Icons.branch className="h-5 w-5" />
          <span className="text-xs font-extrabold uppercase">{default_branch}</span>
        </div>

        <div className="text-lg font-extrabold">{name}</div>
      </div>

      <div className="relative">
        <Icon
          name="search"
          className="absolute inset-y-0 left-3 my-auto h-6 w-6 text-gray-500"
        />
        <Input
          className="pl-11"
          placeholder="Search component..."
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
}
