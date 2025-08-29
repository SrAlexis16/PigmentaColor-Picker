"use client";

import { useTranslation } from 'react-i18next';

import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Telescope } from "lucide-react";

export default function FavoriteColors({ isOpen, onOpenChange }) {
  const { t } = useTranslation(); 

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-md bg-neutral-800 dark:bg-white p-2 mr-1"
    >
      <CollapsibleTrigger asChild>
        <Button className="flex items-center justify-between cursor-pointer px-2 py-1 w-full bg-transparent border-none">
          <h1 className="text-neutral-200 dark:text-black text-lg lg:text-2xl">{t('section.favoriteColors')}</h1>
          {isOpen ?
            <ChevronUp className="hidden lg:block h-6 w-6 text-white dark:text-black" /> :
            <ChevronDown className="hidden lg:block h-6 w-6 text-white dark:text-black" />
          }
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-2 py-2 font-semibold text-white dark:text-black text-lg">
        <div className="max-h-30 overflow-y-auto">
          <ul className="flex flex-row flex-wrap gap-4">
            <li><p className="flex flex-row gap-2"> <Telescope/> {t("context.tags.contentSoon")} </p></li>
            {/* 
            <li className="h-9 w-9 bg-blue-500"></li>
            <li className="h-9 w-9 bg-green-500"></li>
            <li className="h-9 w-9 bg-yellow-500"></li>
            <li className="h-9 w-9 bg-purple-500"></li>
            <li className="h-9 w-9 bg-orange-500"></li>
            <li className="h-9 w-9 bg-indigo-500"></li>
            <li className="h-9 w-9 bg-pink-500"></li>
            <li className="h-9 w-9 bg-teal-500"></li>
            <li className="h-9 w-9 bg-cyan-500"></li>
            <li className="h-9 w-9 bg-lime-500"></li>
            <li className="h-9 w-9 bg-fuchsia-500"></li>
            <li className="h-9 w-9 bg-fuchsia-500"></li>
*/}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}