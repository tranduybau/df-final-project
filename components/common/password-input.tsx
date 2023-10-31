import React from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

import { cn } from '@/lib/utils';

import {
  FormControl, FormItem, FormLabel, FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import Icon from './icon';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  leftIcon?: keyof typeof dynamicIconImports
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({
    className, label, ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              className={cn('', className)}
              ref={ref}
              {...props}
            />
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              className="absolute inset-y-0 right-3 my-auto h-6 w-6 cursor-pointer text-gray-500"
              onClick={handleShowPassword}
            />
          </div>
        </FormControl>
        <FormMessage />

      </FormItem>

    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
