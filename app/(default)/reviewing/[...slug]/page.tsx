'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Icon from '@/components/common/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

import ROUTES from '@/constants/ROUTES';
import { useGetGithubRepositoryOverview } from '@/zustand/useGetGithubRepository';

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

  const { actionGetGithubRepositoryOverview } = useGetGithubRepositoryOverview();

  const [mounted, setMounted] = React.useState(false);

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

  React.useEffect(() => {
    /**
     * Em verify hết các case khi vào page này mà link không phải repos
     * 1. Không có link repos
     * 2. Link ít nhất 2 item (user/repo)
     * 3. Link repos không valid
     */

    let timer: NodeJS.Timeout;

    if (params.slug.length < 2) {
      toast({
        role: 'error', // toast của thằng này có vẻ gà, warning/error không thật sự meanful UI nhỉ, background của nó vẫn trắng toast =))
        title: 'Invalid link',
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

  /**
   * Check document useSWR ở đây (không cần SSR vì page này mình review, CSR thôi
   * https://chat.openai.com/share/ac34d19c-6a47-428c-946d-0bd9b14a09d2
   */

  // case đã load github, mọi thứ oke
  return (
    <section className="container mt-10">
      <Card>
        <CardContent className="px-4 py-6">
          <ReviewHeader name="Freecodecamp" branch="master" />

          <div className="mt-4">
            <Card>
              <CardContent className="flex flex-col gap-y-2 p-4">
                <ReviewCard
                  fileName="tools\releaseBuild\vstsbuild.sh"
                  suggestionCount={8}
                  warningCount={2}
                  grade="A"
                />
                <ReviewCard
                  fileName="tools\releaseBuild\vstsbuild.sh"
                  suggestionCount={8}
                  warningCount={2}
                  grade="B"
                />
                <ReviewCard
                  fileName="tools\releaseBuild\vstsbuild.sh"
                  suggestionCount={8}
                  warningCount={2}
                  grade="C"
                />
                <ReviewCard
                  fileName="tools\releaseBuild\vstsbuild.sh"
                  suggestionCount={8}
                  warningCount={2}
                  grade="D"
                />
                {/* {Array.from({ length: 10 }).map((_, i) => (
                  <ReviewCard
                    key={i}
                    fileName="tools\releaseBuild\vstsbuild.sh"
                    suggestionCount={8}
                    warningCount={2}
                    grade=""
                  />
                ))} */}
              </CardContent>
            </Card>

            <div className="mt-4 flex items-center justify-between">
              <Button variant="ghost">
                <Icon name="move-left" className="mr-2 h-4 w-4 text-gray-500" />
                Previous page
              </Button>

              <Button variant="ghost">
                Next page
                <Icon
                  name="move-right"
                  className="ml-2 h-4 w-4 text-gray-500"
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
