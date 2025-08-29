"use client";

import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { 
  useVisualColor, 
  useColorPicker, 
  useIsColorUpdating 
} from '@/context/ColorContext';
import * as colorUtils from '@/lib/color';
import Sketch from '@uiw/react-color-sketch';
import { Card, CardContent } from '@/components/ui/card';
import { ColorSwatch } from '@/components/ColorSwatch';
import { ColorInput } from '@/components/ColorInput';

export const DeveloperColorPicker = () => {
  const {
    currentColor,
    isUpdating,
    onChange,
    onChangeComplete,
    onCancel,
    onApply
  } = useColorPicker();

  const visualColor = useVisualColor();
  const isUserInteracting = useRef(false);
  const lastUserAction = useRef('none');

  // Estado local para el input HEX
  const [localHexValue, setLocalHexValue] = useState(() => 
    colorUtils.toHex(visualColor)
  );

  // Sincronizar el input local cuando el color visual cambia
  useEffect(() => {
    if (!isUserInteracting.current || lastUserAction.current !== 'input') {
      setLocalHexValue(colorUtils.toHex(visualColor));
    }
  }, [visualColor]);

  const handleSketchChange = useCallback((newShade) => {
    isUserInteracting.current = true;
    lastUserAction.current = 'sketch';
    onChange(newShade.hex);
  }, [onChange]);

  const handleSketchChangeComplete = useCallback((newShade) => {
    if (isUserInteracting.current && lastUserAction.current === 'sketch') {
      onChangeComplete(newShade.hex);
      isUserInteracting.current = false;
      lastUserAction.current = 'none';
    }
  }, [onChangeComplete]);

  // Handler para cambios en el input HEX
  const handleHexInputChange = useCallback((e) => {
    const value = e.target.value;
    setLocalHexValue(value);
    
    isUserInteracting.current = true;
    lastUserAction.current = 'input';

    if (colorUtils.isValidColor(value)) {
      onChange(value);
    }
  }, [onChange]);

  // Handler para cuando el input HEX pierde el foco
  const handleHexInputBlur = useCallback((e) => {
    const value = e.target.value;
    
    if (colorUtils.isValidColor(value)) {
      if (isUserInteracting.current && lastUserAction.current === 'input') {
        onChangeComplete(value);
      }
    } else {
      setLocalHexValue(colorUtils.toHex(visualColor));
      onCancel();
    }
    
    isUserInteracting.current = false;
    lastUserAction.current = 'none';
  }, [onChangeComplete, onCancel, visualColor]);

  const isHexInputValid = colorUtils.isValidColor(localHexValue);

  return (
    <div className="w-full h-full justify-between items-center p-2">
      <Card className="flex flex-col h-full w-full items-center overflow-y-auto overflow-x-hidden">
        <CardContent className="flex flex-col md:flex-row items-center justify-center p-2 gap-4">
          <Sketch
            color={currentColor}
            onChange={handleSketchChange}
            presetColors={false}
            editableDisable={false}
            width={200}
            disableAlpha={true}
          />
          <ColorSwatch
            color={visualColor}
            className="hidden lg:block h-[100px] w-[100px]"
            style={{ 
              opacity: isUpdating ? 0.8 : 1,
              transition: 'opacity 0.2s ease'
            }}
          />
        </CardContent>

        <CardContent className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <ColorInput
              id="hex-input"
              label="HEX"
              value={localHexValue}
              placeholder="#FF0000"
              isValid={isHexInputValid}
              onChange={handleHexInputChange}
              onBlur={handleHexInputBlur}
              className={`${isUpdating && isUserInteracting.current && lastUserAction.current === 'input' ? 'opacity-75' : ''} ${
                !isHexInputValid && isUserInteracting.current && lastUserAction.current === 'input' ? 'border-red-300' : ''
              }`}
            />
          </div>

          <div className="flex justify-start md:hidden">
            <ColorSwatch
              color={visualColor}
              className="h-[80px] w-[80px]"
              style={{ 
                opacity: isUpdating ? 0.8 : 1,
                transition: 'opacity 0.2s ease'
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};