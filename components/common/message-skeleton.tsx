import React from 'react';

import { Skeleton } from '../ui/skeleton';

interface MessageSkeletonProps {
  isHumanMess?: boolean
}

export default function MessageSkeleton({ isHumanMess = false }: MessageSkeletonProps) {
  if (isHumanMess) {
    return (
      <div className="flex items-start justify-end space-x-3 p-3">
        <Skeleton className="h-20 w-1/2 rounded-md" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 p-3">
      <Skeleton className="h-12 w-12 rounded-full" />

      <Skeleton className="h-60 w-full rounded-md" />
    </div>
  );
}
