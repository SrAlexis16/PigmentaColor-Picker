"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { mixColors, toRgba, toHex, isValidColor } from '@/lib/color/index';
import { ColorInput } from '@/components/ColorInput';
import { ColorSwatch } from '@/components/ColorSwatch';
import { Slider } from "@/components/ui/slider";
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { useSetMainColor } from '@/context/ColorContext';
import { useTranslation } from 'react-i18next';

const DEFAULT_COLOR_1 = "#3498db";
const DEFAULT_COLOR_2 = "#db7734";
const DEFAULT_PERCENTAGE = 50;

const ColorMixer = () => {
    const setMainColor = useSetMainColor();
    const { t } = useTranslation();

    const [color1, setColor1] = useState(DEFAULT_COLOR_1);
    const [color2, setColor2] = useState(DEFAULT_COLOR_2);
    const [percentage1, setPercentage1] = useState(DEFAULT_PERCENTAGE);
    
    const percentage2 = 100 - percentage1;

    const mixedColor = useMemo(() => {
        const isColor1Valid = isValidColor(color1);
        const isColor2Valid = isValidColor(color2);

        if (isColor1Valid && isColor2Valid) {
            try {
                return mixColors(color1, color2, percentage1 / 100);
            } catch (error) {
                console.error('Error mixing colors:', color1, color2, error);
                return '';
            }
        }
        return '';
    }, [color1, color2, percentage1]);

    useEffect(() => {
        if (mixedColor) {
            setMainColor(mixedColor, { debounceMs: 200 });
        }
    }, [mixedColor, setMainColor]);
    
    // Handlers de los sliders
    const handleSlider1Change = useCallback((value) => {
        setPercentage1(value[0]);
    }, []);

    const handleSlider2Change = useCallback((value) => {
        setPercentage1(100 - value[0]);
    }, []);
    
    const handleSlider1Commit = useCallback((value) => {
        const mixed = mixColors(color1, color2, value[0] / 100);
        setMainColor(mixed, { immediate: true });
    }, [setMainColor, color1, color2]);

    const handleSlider2Commit = useCallback((value) => {
        const mixed = mixColors(color1, color2, (100 - value[0]) / 100);
        setMainColor(mixed, { immediate: true });
    }, [setMainColor, color1, color2]);

    const handleColor1Change = useCallback((e) => {
        setColor1(e.target.value);
    }, []);

    const handleColor2Change = useCallback((e) => {
        setColor2(e.target.value);
    }, []);

    const copyToClipboard = useCallback((text) => {
        if (text) {
            navigator.clipboard.writeText(text);
        }
    }, []);

    const isColor1Valid = isValidColor(color1);
    const isColor2Valid = isValidColor(color2);

    return (
        <TooltipProvider>
            <div className="w-full h-full justify-between items-center p-2">
                <Card className="flex flex-col h-full w-full items-center overflow-y-auto overflow-x-hidden p-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 w-full h-full">
                        <div className="flex flex-col gap-6 w-full justify-center">
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                                    <div className="flex-1 min-w-0">
                                        <ColorInput
                                            id="color1"
                                            label="Color 1"
                                            value={color1}
                                            placeholder="Ej: #FF0000"
                                            isValid={isColor1Valid}
                                            errorMessage={t("context.invalidFormat")}
                                            onChange={handleColor1Change}
                                        />
                                    </div>
                                    <div className="flex-shrink-0 self-center sm:self-auto">
                                        <ColorSwatch
                                            color={color1}
                                            className="w-12 h-12 sm:w-10 sm:h-10 mx-auto sm:mx-0"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Label htmlFor="percentage1" className="text-sm font-medium text-nowrap min-w-[3rem]">
                                        {percentage1}%
                                    </Label>
                                    <Slider
                                        id="percentage1"
                                        value={[percentage1]}
                                        onValueChange={handleSlider1Change}
                                        onValueCommit={handleSlider1Commit}
                                        max={100}
                                        step={1}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                                    <div className="flex-1 min-w-0">
                                        <ColorInput
                                            id="color2"
                                            label="Color 2"
                                            value={color2}
                                            placeholder="Ej: #0000FF"
                                            isValid={isColor2Valid}
                                            errorMessage={t("context.invalidFormat")}
                                            onChange={handleColor2Change}
                                        />
                                    </div>
                                    <div className="flex-shrink-0 self-center sm:self-auto">
                                        <ColorSwatch
                                            color={color2}
                                            className="w-12 h-12 sm:w-10 sm:h-10 mx-auto sm:mx-0"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Label htmlFor="percentage2" className="text-sm font-medium text-nowrap min-w-[3rem]">
                                        {percentage2}%
                                    </Label>
                                    <Slider
                                        id="percentage2"
                                        value={[percentage2]}
                                        onValueChange={handleSlider2Change}
                                        onValueCommit={handleSlider2Commit}
                                        max={100}
                                        step={1}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-start gap-4 w-full lg:border-l lg:border-gray-200 lg:pl-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-center">{t("context.result")}</h2>

                            <div className="flex-shrink-0">
                                <ColorSwatch 
                                    color={mixedColor} 
                                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" 
                                    style={{ backgroundColor: mixedColor || '#000' }}
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full max-w-md">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <span className="font-medium dark:text-gray-300 text-sm sm:text-base w-full sm:w-16 text-center sm:text-left">
                                        HEX:
                                    </span>
                                    <div className="flex items-center gap-2 flex-1">
                                        <div className="flex-1 p-2 sm:p-3 bg-neutral-300 rounded-md font-mono text-xs sm:text-sm text-gray-800 break-all text-center sm:text-left min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center sm:justify-start">
                                            {mixedColor ? toHex(mixedColor) : t("context.invalidFormat")}
                                        </div>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                                                    onClick={() => copyToClipboard(mixedColor ? toHex(mixedColor) : '')}
                                                    disabled={!mixedColor}
                                                >
                                                    <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {t("context.copyHEX")}
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <span className="font-medium dark:text-gray-300 text-sm sm:text-base w-full sm:w-16 text-center sm:text-left">
                                        RGBA:
                                    </span>
                                    <div className="flex items-center gap-2 flex-1">
                                        <div className="flex-1 p-2 sm:p-3 bg-neutral-300 rounded-md font-mono text-xs sm:text-sm text-gray-800 break-all text-center sm:text-left min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center sm:justify-start">
                                            {mixedColor ? toRgba(mixedColor) : t("context.invalidFormat")}
                                        </div>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                                                    onClick={() => copyToClipboard(mixedColor ? toRgba(mixedColor) : '')}
                                                    disabled={!mixedColor}
                                                >
                                                    <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {t("context.copyRGBA")}
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </TooltipProvider>
    );
};

export default ColorMixer;