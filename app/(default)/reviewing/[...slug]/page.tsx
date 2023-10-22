'use client';

import React, { useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Icon from '@/components/common/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

import ROUTES from '@/constants/ROUTES';
import { GitHubFileType, useGetGithubRepositoryOverview, useGetRepositoryFiles } from '@/zustand/useGetGithubRepository';

import ReviewCard from './_components/review-card';
import ReviewHeader from './_components/review-header';

interface Props {
  params: {
    slug: string[];
  };
}

export default function DynamicPage(props: Props) {
  const { params } = props;

  const router = useRouter();

  const { toast } = useToast();

  const { overview, actionGetGithubRepositoryOverview } = useGetGithubRepositoryOverview();
  const { files, actionGetGithubRepositoryFiles } = useGetRepositoryFiles();

  const [mounted, setMounted] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [searchFilesValue, setSearchFilesValue] = React.useState('');

  const filteredFiles = React.useMemo(
    () => {
      if (searchFilesValue) {
        // eslint-disable-next-line max-len
        return files.filter((file: GitHubFileType) => file.path.toLowerCase().includes(searchFilesValue.toLowerCase())).slice((page - 1) * 10, page * 10);
      }
      return files.slice((page - 1) * 10, page * 10);
    },
    [files, page, searchFilesValue],
  );

  const onCheckGitHubRepositoryOverview = async () => {
    const repositoryOverview = await actionGetGithubRepositoryOverview(
      params.slug.join('/'),
    );

    if (repositoryOverview?.default_branch) {
      setMounted(true);
      return;
    }

    router.push(ROUTES.HOME);
  };

  useMemo(() => {
    if (!overview?.default_branch) return;

    actionGetGithubRepositoryFiles(params.slug.join('/'), overview.default_branch);
  }, [overview?.default_branch]);

  React.useEffect(() => {
    /**
     * Em verify hết các case khi vào page này mà link không phải repos
     * 1. Không có link repos
     * 2. Link ít nhất 2 item (user/repo)
     * 3. Link repos không valid
     */
    (async () => {
      if (!params.slug.length || params.slug.length < 2) {
        router.push(ROUTES.HOME);
        return;
      }

      const repository = await actionGetGithubRepositoryOverview(params.slug.join('/'));

      if (!repository?.default_branch) {
        router.push(ROUTES.HOME);
      }
    })();

    let timer: NodeJS.Timeout;

    if (params.slug.length < 2) {
      toast({
        role: 'error', // toast của thằng này có vẻ gà, warning/error không thật sự meanful UI nhỉ, background của nó vẫn trắng toast =))
        title: 'Invalid link',
        variant: 'destructive', // thêm dòng này là nó toast đỏ chót cho mình nè anh =)) nhma vẫn gà, chỉ có màu trắng với đỏ :v
        description: 'Please try again later',
      });

      timer = setTimeout(() => {
        router.push(ROUTES.HOME);
      }, 2000);
    }

    onCheckGitHubRepositoryOverview();

    return () => {
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNextPage = () => {
    if (page === Math.ceil(files.length / 10)) return;
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleSearchFiles = (value: string) => {
    setSearchFilesValue(value);
  };

  // Case loading component
  if (!mounted) {
    return (
      <section className="container flex flex-col items-center gap-10 py-20">
        <RefreshCw className="mx-auto animate-spin" size={50} />
        <h1>
          We are fetching your GitHub repository, please wait a few seconds
        </h1>
      </section>
    );
  }

  if (!overview) return null;

  /**
   * Check document useSWR ở đây (không cần SSR vì page này mình review, CSR thôi
   * https://chat.openai.com/share/ac34d19c-6a47-428c-946d-0bd9b14a09d2
   */

  // case đã load github, mọi thứ oke
  return (
    <section className="container mt-10">
      <Card>
        <CardContent className="px-4 py-6">
          <ReviewHeader repositoryOverView={overview} onSearchFiles={handleSearchFiles} />

          <div className="mt-4">
            <Card>
              <CardContent className="flex flex-col gap-y-2 p-4">
                {filteredFiles.map((file: GitHubFileType) => (
                  <ReviewCard
                    grade="A"
                    key={file.sha}
                    fileName={file.path}
                  />
                ))}
              </CardContent>
            </Card>

            <div className="mt-4 flex items-center justify-between">
              {page > 1 ? (
                <Button variant="ghost" onClick={handlePrevPage}>
                  <Icon name="move-left" className="mr-2 h-4 w-4 text-gray-500" />
                  Previous page
                </Button>
              ) : <div />}

              {page < Math.ceil(files.length / 10) && (
                <Button variant="ghost" onClick={handleNextPage}>
                  Next page
                  <Icon
                    name="move-right"
                    className="ml-2 h-4 w-4 text-gray-500"
                  />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
