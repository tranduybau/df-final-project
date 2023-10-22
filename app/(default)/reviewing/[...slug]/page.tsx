'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';

import ROUTES from '@/constants/ROUTES';
import { useGetGithubRepositoryOverview } from '@/zustand/useGetGithubRepository';

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
    const repositoryOverview = await actionGetGithubRepositoryOverview(params.slug.join('/'));

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
    <section className="container">
      <h1>Dynamic Page</h1>
    </section>
  );
}
