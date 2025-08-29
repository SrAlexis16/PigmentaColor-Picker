"use client";

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const ColorInput = ({
    id,
    label,
    value,
    placeholder,
    isValid,
    errorMessage,
    onChange,
    onBlur,
    className
}) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <Label htmlFor={id} className="flex items-center gap-2">
                {label}:
                <span className="flex items-center">
                    {isValid ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <AlertCircle className="w-4 h-4 text-red-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{errorMessage}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </span>
            </Label>
            <Input
                id={id}
                type="text"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={className}
                placeholder={placeholder}
            />
        </div>
    );
};