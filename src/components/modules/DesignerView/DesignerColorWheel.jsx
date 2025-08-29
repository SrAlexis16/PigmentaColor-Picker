"use client";

import React, { useMemo } from "react";
import { 
  useVisualColor, 
  useColorActions 
} from "@/context/ColorContext";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ColorWheel } from "@/components/modules/DesignerView/ColorWheel";
import { ColorSliders } from "@/components/modules/DesignerView/ColorSliders";
import { useTranslation } from 'react-i18next';
import * as colorUtils from '@/lib/color';

const useColorValidation = () => {
  const visualColor = useVisualColor();
  
  return useMemo(() => {
    if (!visualColor) return { isValid: false, error: 'No color provided' };
    
    try {
      const isValid = colorUtils.isValidColor(visualColor);
      return { 
        isValid, 
        error: isValid ? null : 'Invalid color format',
        color: visualColor 
      };
    } catch (error) {
      return { 
        isValid: false, 
        error: error.message,
        color: visualColor 
      };
    }
  }, [visualColor]);
};

const ColorErrorDisplay = React.memo(({ error, color }) => {
  const { t } = useTranslation();
  
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
        <div className="text-center space-y-2">
          <p className="text-red-600 dark:text-red-400 font-medium">
            {t("context.invalidColor")}
          </p>
          <p className="text-sm text-red-500 dark:text-red-300">
            {color}
          </p>
          <p className="text-xs text-red-400 dark:text-red-500">
            {error}
          </p>
        </div>
      </Card>
    </div>
  );
});

ColorErrorDisplay.displayName = 'ColorErrorDisplay';

const ColorWheelSection = React.memo(() => (
  <div className="flex-1 flex items-center justify-center p-4 lg:p-6 relative">
    <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[350px] aspect-square">
      <ColorWheel />
    </div>
  </div>
));

ColorWheelSection.displayName = 'ColorWheelSection';

const ColorSlidersSection = React.memo(() => (
  <div className="flex-shrink-0 p-4 lg:p-6 lg:w-80">
    <div className="flex flex-col items-center justify-center h-full">
      <ColorSliders />
    </div>
  </div>
));

ColorSlidersSection.displayName = 'ColorSlidersSection';

const ResponsiveSeparators = React.memo(() => (
  <>
    <Separator orientation="vertical" className="hidden lg:block my-4" />
    <Separator orientation="horizontal" className="lg:hidden mx-4" />
  </>
));

ResponsiveSeparators.displayName = 'ResponsiveSeparators';

export const DesignerColorWheel = React.memo(() => {
  const { isValid, error, color } = useColorValidation();
  const { flushUpdates } = useColorActions();

  if (!isValid) {
    return <ColorErrorDisplay error={error} color={color} />;
  }

  return (
    <div className="w-full h-full justify-between items-center p-2">
      <Card className="flex flex-col md:flex-row h-[370px] justify-center items-center overflow-y-auto overflow-x-hidden lg:overflow-x-auto md:overflow-x-hidden relative">
        <div 
          className="flex flex-col lg:flex-row h-full w-full"
          onMouseLeave={flushUpdates}
        >
          <ColorWheelSection />
          
          <ResponsiveSeparators />
          
          <ColorSlidersSection />
        </div>
      </Card>
    </div>
  );
});

DesignerColorWheel.displayName = 'DesignerColorWheel';

export default DesignerColorWheel;