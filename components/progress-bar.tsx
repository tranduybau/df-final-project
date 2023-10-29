'use client';

import React from 'react';
import { isSSR } from '@dwarvesf/react-utils';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const options = { showSpinner: false };

function ProgressBarProvider({ children }: React.PropsWithChildren) {
  const isDarkMode = isSSR() ? 'light' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const progressBarColor = isDarkMode ? '#fff' : '#131313';

  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color={progressBarColor}
        options={options}
        shallowRouting
      />
    </>
  );
}

export default ProgressBarProvider;
