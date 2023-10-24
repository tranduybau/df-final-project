'use client';

import React from 'react';
import debounce from 'lodash.debounce';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Icon from '@/components/common/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import ROUTES from '@/constants/ROUTES';
import { ReviewMessageMap, ReviewMessageRole } from '@/types/chatGPT';
import { getContentFileRepository, getReviewFromChatGPT } from '@/utils/chatGPT';
import getReviewPrompt from '@/utils/prompt';
import { GitHubFileType, useGetGithubRepositoryOverview, useGetRepositoryFiles } from '@/zustand/useGetGithubRepository';

import ReviewCard from './_components/review-card';
import ReviewHeader from './_components/review-header';

const PER_PAGE = 10;

interface Props {
  params: {
    slug: string[];
  };
}

export default function DynamicPage(props: Props) {
  const { params } = props;

  const router = useRouter();

  const { overview, actionGetGithubRepositoryOverview } = useGetGithubRepositoryOverview();
  const { files, actionGetGithubRepositoryFiles } = useGetRepositoryFiles();

  const [mounted, setMounted] = React.useState(false); // show loading ui on init page
  const [page, setPage] = React.useState(1);
  const [searchFilesValue, setSearchFilesValue] = React.useState('');
  const [reviewMessages, setReviewMessages] = React.useState<ReviewMessageMap>({});

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

  const handleNextPage = () => {
    if (page === Math.ceil(files.length / PER_PAGE)) return;
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleSearchFiles = debounce((value: string) => {
    setSearchFilesValue(value);
    setPage(1);
  }, 500);

  const handleReviewMessage = async (fileName: string) => {
    // If review message is already exist, don't need to fetch again
    if (reviewMessages?.[fileName]?.length) return;

    // eslint-disable-next-line max-len
    const contentFile = await getContentFileRepository({ fileName, pathName: overview!.full_name, branch: overview!.default_branch });
    if (!contentFile) return;

    const prompt = getReviewPrompt(contentFile);

    const messages = [{ role: 'system', content: prompt }];

    const message = await getReviewFromChatGPT(messages);
    if (!message) return;

    setReviewMessages((prev) => ({
      ...prev,
      [fileName]: [...messages, { role: ReviewMessageRole.ASSISTANT, content: message }],
    }));
  };

  const handleUserChat = async (message: string, fileName: string) => {
    // eslint-disable-next-line max-len
    const newMessagesRequest = [...reviewMessages?.[fileName] ?? [], { role: ReviewMessageRole.USER, content: message }];

    const newMessage = await getReviewFromChatGPT(newMessagesRequest);
    if (!newMessage) return;

    setReviewMessages((prev) => ({
      ...prev,
      // eslint-disable-next-line max-len
      [fileName]: [...newMessagesRequest, { role: ReviewMessageRole.ASSISTANT, content: newMessage }],
    }));
  };

  const onCheckRepositoryPublic = async () => {
    const repository = await actionGetGithubRepositoryOverview(params.slug.join('/'));

    if (!repository?.default_branch) {
      router.push(ROUTES.HOME);
      return;
    }

    const listFiles = await actionGetGithubRepositoryFiles(params.slug.join('/'), repository.default_branch);

    if (!listFiles.length) {
      router.push(ROUTES.HOME);
      return;
    }

    // API get 10 reviews page 1
    // 1. object messages -> find value by key
    // API get 10 reviews -> push currentPage lên, zustand sẽ slice ra 10 file tương ứng page
    // sau đó get content 10 files (await Prmoses([files]])),
    // rồi  gọi GPT 10 reviews (await Promise.all)

    setPage(1);

    setMounted(true);
  };

  React.useEffect(() => {
    if (!params.slug.length || params.slug.length < 2) {
      router.push(ROUTES.HOME);
      return;
    }

    onCheckRepositoryPublic();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    key={file.sha}
                    fileName={file.path}
                    reviewMessages={reviewMessages?.[file.path] ?? []}
                    onReviewMessageChange={handleReviewMessage}
                    onUserChat={handleUserChat}
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
