"use client";

import { useTranslation } from 'react-i18next';

import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"; 
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function GeneralSettings({ isOpen, onOpenChange, enableFooter, setEnableFooter, enableContrastChecker, setEnableContrastChecker }) {
  const { t } = useTranslation(); 

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-md bg-neutral-800 dark:bg-white p-2 mr-1"
    >
      <CollapsibleTrigger asChild>
        <Button className="flex items-center justify-between cursor-pointer px-2 py-1 w-full bg-transparent border-none">
          <h1 className="text-neutral-200 dark:text-black text-lg lg:text-2xl">{t("section.generalSettings")}</h1>
          {isOpen ?
            <ChevronUp className="hidden lg:block h-6 w-6 text-white dark:text-black" /> :
            <ChevronDown className="hidden lg:block h-6 w-6 text-white dark:text-black" />
          }
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-4 px-2 py-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="footer"
            checked={enableFooter}
            onCheckedChange={(checked) => setEnableFooter(Boolean(checked))}
            className="border-white dark:border-black data-[state=checked]:bg-blue-300 data-[state=checked]:text-black"
          />
          <Label htmlFor="footer" className="text-white dark:text-black text-lg cursor-pointer">
            {t("checkbox.footer")}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="contrast-checker"
            checked={enableContrastChecker}
            onCheckedChange={(checked) => setEnableContrastChecker(Boolean(checked))}
            className="border-white dark:border-black data-[state=checked]:bg-blue-300 data-[state=checked]:text-black"
          />
          <Label htmlFor="contrast-checker" className="text-white dark:text-black text-lg cursor-pointer">
            {t("checkbox.contrastChecker")}
          </Label>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}