'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Form, FormControl, FormField, FormItem, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import StartDeco from '@/assets/images/star.svg';
import ROUTES from '@/constants/ROUTES';
import { useGetGithubRepositoryOverview } from '@/zustand/useGetGithubRepository';

const formSchema = z.object({
  repository: z.string().superRefine(
    (value, ctx) => {
      if (!value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Repository is required.',
        });
        return;
      }

      if (!(value.startsWith('https://github.com') || value.startsWith('github.com'))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter a valid GitHub repository.',
        });
        return;
      }
      const formattedLink = value.replace('https://github.com/', '').replace('github.com/', '');

      if (formattedLink.split('/').length !== 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter a valid GitHub repository.',
        });
      }
    },
  ),
});

function SearchForm() {
  const router = useRouter();

  const {
    isLoadingGithubRepositoryOverview,
    actionGetGithubRepositoryOverview,
  } = useGetGithubRepositoryOverview();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repository: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formattedLink = data.repository.replace('https://github.com/', '').replace('github.com/', '');
    const repository = await actionGetGithubRepositoryOverview(formattedLink);

    if (repository?.default_branch) {
      router.push(ROUTES.REVIEWING(formattedLink));
    }
  };

  return (
    <div
      className="relative mx-auto w-full max-w-2xl justify-between rounded-full border-[3px] border-slate-900"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
          <FormField
            control={form.control}
            name="repository"
            render={({ field }) => (
              <FormItem className="relative !m-0 flex flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://github.com/project/project.git"
                    className="h-auto rounded-l-full border-0 !ring-0 !ring-offset-0"
                  />
                </FormControl>

                <FormMessage className="absolute left-0 top-[100%]">
                  {form.getFieldState('repository').error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button className="h-full max-h-[52px] min-w-[190px] shrink-0 rounded-full bg-slate-900 px-8 py-4 text-white hover:bg-slate-800" disabled={isLoadingGithubRepositoryOverview}>
            {isLoadingGithubRepositoryOverview ? <div className=""><Icons.spinner className="h-6 w-6 animate-spin text-gray-500" /></div> : 'Code Review Now'}
          </Button>
        </form>
      </Form>

      <div className="absolute -left-20 h-20 w-20 rotate-180 animate-spin">
        <Image src={StartDeco} alt="" />
      </div>
      <div className="absolute right-20 top-12 h-20 w-20 animate-spin">
        <Image src={StartDeco} alt="" />
      </div>
      <div className="absolute -top-20 left-16 h-20 w-20 rotate-90 animate-spin">
        <Image src={StartDeco} alt="" />
      </div>
      <div className="absolute -top-20 left-16 h-20 w-20 rotate-180 animate-spin">
        <Image src={StartDeco} alt="" />
      </div>
      <div className="absolute -top-20 right-48 h-20 w-20 rotate-90 animate-spin">
        <Image src={StartDeco} alt="" />
      </div>
      <div className="absolute left-36 top-16 h-20 w-20 rotate-180 animate-spin">
        <Image src={StartDeco} alt="" />
      </div>
      <div className="absolute -right-20 h-20 w-20 rotate-90 animate-spin">
        <Image src={StartDeco} alt="" />
      </div>
    </div>
  );
}

export default SearchForm;
