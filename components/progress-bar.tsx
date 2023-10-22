'use client';

import React, { PropsWithChildren } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const options = { showSpinner: false };

function ProgressBarProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#131313"
        options={options}
        shallowRouting
      />
    </>
  );
}

export default ProgressBarProvider;
