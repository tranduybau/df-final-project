'use client';

import React from 'react';
import debounce from 'lodash.debounce';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Icon from '@/components/common/icon';
import ChatWithGPTDialog from '@/components/dialog/chat-with-gpt-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import ReviewCard from '@/app/(default)/reviewing/[...slug]/_components/review-card';
import ENV from '@/constants/env';
import ROUTES from '@/constants/ROUTES';
import { getContentFileRepository, getReviewFromChatGPT } from '@/services/chatGPT';
import { ReviewMessageMap, ReviewMessageRole } from '@/types/chatGPT';
import getReviewPrompt from '@/utils/prompt';
import { GitHubFileType, useGetGithubRepositoryOverview, useGetRepositoryFiles } from '@/zustand/useGetGithubRepository';
import { useGPTMessageDialog } from '@/zustand/useModal';

import ReviewHeader from './_components/review-header';

const PER_PAGE = +(ENV.REVIEW_PER_PAGE ?? 10);

interface Props {
  params: {
    slug: string[];
  };
}

export default function DynamicPage(props: Props) {
  const { params } = props;
  const { selectedFile, actionSelectedFileChange } = useGPTMessageDialog();

  const router = useRouter();

  const { overview, actionGetGithubRepositoryOverview } = useGetGithubRepositoryOverview();
  const { files, actionGetGithubRepositoryFiles } = useGetRepositoryFiles();

  const [mounted, setMounted] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [searchFilesValue, setSearchFilesValue] = React.useState('');
  const [reviewMessages, setReviewMessages] = React.useState<ReviewMessageMap>({});
  const [isLoadingReview, setIsLoadingReview] = React.useState(false);

  const filteredFiles = React.useMemo(
    () => {
      let newFiles = files;

      if (searchFilesValue) {
        newFiles = files.filter((file: GitHubFileType) => {
          const fileName = file.path.toLowerCase();
          return fileName.includes(searchFilesValue.toLowerCase());
        });
      }

      return newFiles.slice((page - 1) * PER_PAGE, page * PER_PAGE);
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

  const onGetAllReviewsContent = async (fileName: string) => {
    // If review message is already exist, don't need to fetch again
    if (reviewMessages?.[fileName]?.length || !overview) return;

    const contentFile = await getContentFileRepository(
      {
        fileName,
        pathName: overview.full_name,
        branch: overview.default_branch,
      },
    );
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

  const handleUserSendMessage = async (message: string, fileName: string) => {
    const newMessagesRequest = [...reviewMessages?.[fileName] ?? [],
      { role: ReviewMessageRole.USER, content: message }];

    setReviewMessages((prev) => ({
      ...prev,
      [fileName]: [
        ...newMessagesRequest,
      ],
    }));

    setIsLoadingReview(true);
    const newMessage = await getReviewFromChatGPT(newMessagesRequest);
    if (!newMessage) return;

    setReviewMessages((prev) => ({
      ...prev,
      [fileName]: [
        ...prev?.[fileName] ?? [],
        {
          role: ReviewMessageRole.ASSISTANT,
          content: newMessage,
        }],
    }));

    setIsLoadingReview(false);
  };

  const handleFetchRepository = async () => {
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

    setMounted(true);
  };

  React.useEffect(() => {
    if (!params.slug.length || params.slug.length < 2) {
      router.push(ROUTES.HOME);
      return;
    }

    handleFetchRepository();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getReviewContentForFile = async (file: GitHubFileType) => {
    await onGetAllReviewsContent(file.path);
  };

  React.useEffect(() => {
    if (!overview || filteredFiles?.length === 0) return;

    const fetchReviewData = async () => {
      setIsLoadingReview(true);
      await Promise.all(filteredFiles.map(getReviewContentForFile));
      setIsLoadingReview(false);
    };

    fetchReviewData();
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    page,
    searchFilesValue,
    overview,
    filteredFiles,
  ]);

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
    <>
      <section className="container mt-10">
        <Card>
          <CardContent className="px-4 py-6">
            <ReviewHeader repositoryOverView={overview} onSearchFiles={handleSearchFiles} />

            <div className="mt-4">
              <Card>
                <CardContent className="flex flex-col gap-y-2 p-4">
                  {filteredFiles.length > 0 ? filteredFiles.map((file: GitHubFileType) => (
                    <ReviewCard
                      key={file.sha}
                      fileName={file.path}
                      content={reviewMessages?.[file.path] ?? []}
                      isLoadingReview={isLoadingReview}
                    />
                  )) : (
                    <section className="container flex flex-col items-center gap-10 py-10">
                      <Icon name="inbox" className="mx-auto" size={50} />
                      <h1>
                        No files found
                      </h1>
                    </section>
                  )}

                </CardContent>
              </Card>

              {filteredFiles.length > 0 && (
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
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <ChatWithGPTDialog
        isOpen={!!selectedFile}
        setIsOpen={actionSelectedFileChange}
        content={reviewMessages?.[selectedFile]}
        isLoading={isLoadingReview}
        onSubmitMessage={(message) => handleUserSendMessage(message, selectedFile)}
      />
    </>
  );
}
