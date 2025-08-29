"use client";

import React from 'react';
import { useColorName } from '@/hooks/useColorName';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from 'react-i18next';


export const ColorSwatch = React.memo(({ color, className }) => {
  const { t } = useTranslation(); 
  const { colorName, isLoading } = useColorName(color, 500);
  
  /*console.log('ColorSwatch - Color:', color);
  console.log('ColorSwatch - Color name:', colorName);
  console.log('ColorSwatch - Is loading:', isLoading);*/
  
  const tooltipContent = isLoading 
    ? '...' 
    : (colorName || t("context.unknownColor"));
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`relative group ${className || 'w-8 h-8'}`}>
          <div
            className="w-full h-full rounded-md shadow-md cursor-pointer transition-transform transform hover:scale-110"
            style={{ backgroundColor: color }}
          />
          {isLoading && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
        <p className="text-xs opacity-70">{color}</p>
      </TooltipContent>
    </Tooltip>
  );
});

ColorSwatch.displayName = 'ColorSwatch';