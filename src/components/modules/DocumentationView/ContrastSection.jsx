"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Link } from "lucide-react";

const ContrastSection = ({ isOpen, onOpenChange }) => {
  const { t } = useTranslation();
  const articles = [
    {
      title: t("content.articles.wcagTitle"),
      description: t("content.articles.wcagDescription"),
      url: 'https://webaim.org/articles/contrast/',
    },
    {
      title: t("content.articles.mdnContrastTitle"),
      description: t("content.articles.mdnContrastDescription"),
      url: 'https://www.w3.org/TR/WCAG22/',
    },
  ];

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-md bg-neutral-800 dark:bg-white p-2 mr-1"
    >
      <CollapsibleTrigger asChild>
        <Button className="flex items-center justify-between cursor-pointer px-2 py-1 w-full bg-transparent border-none">
          <h1 className="text-neutral-200 dark:text-black text-md lg:text-2xl font-semibold">{t('content.contrast.title')}</h1>
          {isOpen ? (
            <ChevronUp className="hidden lg:block h-6 w-6 text-white dark:text-black" />
          ) : (
            <ChevronDown className="hidden lg:block h-6 w-6 text-white dark:text-black" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-2 py-2 text-neutral-300 dark:text-black text-lg">
        <p className="text-sm mb-2">
          {t('content.contrast.description1')}
        </p>
        <p className="text-sm">
          {t('content.contrast.description2')}
        </p>
        <section className="mt-4">
          <h4 className="text-md font-semibold mb-2">{t('content.contrast.title')}</h4>
          <ul className="space-y-1" style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {articles.map((article, index) => (
              <li key={index} className="text-sm">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 dark:text-blue-500 hover:underline flex items-start gap-1"
                >
                  <Link size={16} className="mt-1" />
                  <span className="flex-1">{article.title}</span>
                </a>
                <p className="pl-6 text-xs">
                  {article.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ContrastSection;