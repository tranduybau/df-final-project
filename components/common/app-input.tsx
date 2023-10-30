import React from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

import { cn } from '@/lib/utils';

import {
  FormControl, FormItem, FormLabel, FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import Icon from './icon';

export interface AppInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  leftIcon?: keyof typeof dynamicIconImports
}

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({
    className, type, label, leftIcon, ...props
  }, ref) => (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <div className="relative">
          {leftIcon && (
            <Icon
              name={leftIcon}
              className="absolute inset-y-0 left-3 my-auto h-6 w-6 text-gray-500"
            />
          )}
          <Input
            type={type}
            className={cn('', className, leftIcon && 'pl-11')}
            ref={ref}
            {...props}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  ),
);
AppInput.displayName = 'AppInput';

export default AppInput;
