"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ContrastSection from "@/components/modules/DocumentationView/ContrastSection";
import OpacitySection from "@/components/modules/DocumentationView/OpacitySection";
import DeltaESection from "@/components/modules/DocumentationView/DeltaESection";
import UxColorsSection from "@/components/modules/DocumentationView/UxColorsSection";

const COLLAPSIBLE_TYPES = {
  CONTRAST: 'contrast',
  OPACITY: 'opacity',
  DELTA_E: 'deltaE',
  UX_COLORS: 'uxColors',
};

export default function ContentDoc() {
  const [activeCollapsible, setActiveCollapsible] = useState(null);

  const handleCollapsibleToggle = (collapsibleType) => {
    setActiveCollapsible((prev) =>
      prev === collapsibleType ? null : collapsibleType
    );
  };

  return (
    <div className="w-full h-full justify-between items-center p-2">
      <Card className="flex flex-col md:flex-row h-[370px] bg-white dark:bg-neutral-800 justify-center items-center">
        <CardContent className="flex flex-col gap-4 p-2 sm:p-3 w-full h-full">
          <div className="flex flex-col gap-1 sm:gap-2 overflow-y-auto overflow-x-hidden flex-1 min-h-0">

          <ContrastSection
            isOpen={activeCollapsible === COLLAPSIBLE_TYPES.CONTRAST}
            onOpenChange={() => handleCollapsibleToggle(COLLAPSIBLE_TYPES.CONTRAST)}
            />

          <OpacitySection
            isOpen={activeCollapsible === COLLAPSIBLE_TYPES.OPACITY}
            onOpenChange={() => handleCollapsibleToggle(COLLAPSIBLE_TYPES.OPACITY)}
            />

          <DeltaESection
            isOpen={activeCollapsible === COLLAPSIBLE_TYPES.DELTA_E}
            onOpenChange={() => handleCollapsibleToggle(COLLAPSIBLE_TYPES.DELTA_E)}
          />

          <UxColorsSection
            isOpen={activeCollapsible === COLLAPSIBLE_TYPES.UX_COLORS}
            onOpenChange={() => handleCollapsibleToggle(COLLAPSIBLE_TYPES.UX_COLORS)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}