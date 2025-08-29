"use client";

import { useTranslation } from 'react-i18next';

import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";


export default function LanguageSettings({ isOpen, onOpenChange, selectedLanguage, handleLanguageToggle }) {
  const { t } = useTranslation();

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-md bg-neutral-800 dark:bg-white p-2 mr-1"
    >
      <CollapsibleTrigger asChild>
        <Button className="flex items-center justify-between cursor-pointer px-2 py-1 w-full bg-transparent border-none">
          <h1 className="text-white dark:text-black text-lg lg:text-2xl">{t("section.language")}</h1>
          {isOpen ?
            <ChevronUp className="hidden lg:block h-6 w-6 text-white dark:text-black" /> :
            <ChevronDown className="hidden lg:block h-6 w-6 text-white dark:text-black" />
          }
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-3 px-2 py-2">
        <div className="flex items-center space-x-2">
          <Toggle
            pressed={selectedLanguage === 'es'}
            onPressedChange={() => handleLanguageToggle('es')}
            aria-label="Toggle para Español"
            className="hover:bg-transparent hover:cursor-pointer data-[state=on]:bg-blue-300 data-[state=on]:text-gray-800 text-white dark:text-black"
          >
            {t("toggle.spanish")}
          </Toggle>
        </div>
        <div className="flex items-center space-x-2">
          <Toggle
            pressed={selectedLanguage === 'en'}
            onPressedChange={() => handleLanguageToggle('en')}
            aria-label="Toggle para Inglés"
            className="hover:bg-transparent hover:cursor-pointer data-[state=on]:bg-blue-300 data-[state=on]:text-gray-800 text-white dark:text-black"
          >
            {t("toggle.english")}
          </Toggle>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}