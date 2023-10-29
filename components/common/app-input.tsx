import React from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

import { cn } from '@/lib/utils';

import { Input } from '../ui/input';

import Icon from './icon';

export interface AppInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon: keyof typeof dynamicIconImports
}

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({
    className, type, leftIcon, ...props
  }, ref) => (
    <div className="relative">
      {leftIcon && (
      <Icon
        name={leftIcon}
        className="absolute inset-y-0 left-3 my-auto h-6 w-6 text-gray-500"
      />
      )}
      <Input
        type={type}
        className={cn('pl-11', className)}
        ref={ref}
        {...props}
      />
    </div>
  ),
);
AppInput.displayName = 'AppInput';

export default AppInput;
