"use client";

import React, { useMemo, useEffect, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ColorSwatch } from "@/components/ColorSwatch";
import { useTranslation } from 'react-i18next';
import { useVisualColor, useMainColor, useSetMainColor } from "@/context/ColorContext";
import * as colorUtils from "@/lib/color";

const SliderWithLabel = React.memo(({ label, value, onValueChange, onValueCommit }) => (
    <div className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[180px]">
        <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium dark:text-gray-300">{label}</label>
            <span className="text-xs dark:text-gray-300 font-mono min-w-[2.5rem] text-right">{value}%</span>
        </div>
        <Slider
            value={[value]}
            max={100}
            min={0}
            step={1}
            onValueChange={onValueChange}
            onValueCommit={onValueCommit}
            className="w-full"
        />
    </div>
));

SliderWithLabel.displayName = 'SliderWithLabel';

export const ColorSliders = React.memo(() => {
    const { t } = useTranslation();

    const visualColorHex = useVisualColor();
    const mainColorHex = useMainColor();
    const setMainColor = useSetMainColor();
    
    const colorData = useMemo(() => {
        if (!visualColorHex) return null;
        return colorUtils.hexToHsl(visualColorHex);
    }, [visualColorHex]);

    const sliderValues = useMemo(() => {
        if (!colorData) {
            return { alpha: 100, saturation: 100, lightness: 50 };
        }
        return {
            alpha: Math.round(colorData.alpha),
            saturation: Math.round(colorData.s),
            lightness: Math.round(colorData.l)
        };
    }, [colorData]);

    // Un único callback para los cambios en tiempo real (onValueChange)
    const onValueChange = useCallback(({ s, l, alpha }) => {
        if (!colorData) return;
        
        const newHsl = { ...colorData };
        if (s !== undefined) newHsl.s = s;
        if (l !== undefined) newHsl.l = l;
        if (alpha !== undefined) newHsl.alpha = alpha;

        const newColor = colorUtils.hslToHex(newHsl);
        
        // setMainColor sin immediate: true actualiza el previewColor con debounce
        setMainColor(newColor);
    }, [colorData, setMainColor]);

    const onValueCommit = useCallback(({ s, l, alpha }) => {
        if (!colorData) return;
        
        const newHsl = { ...colorData };
        if (s !== undefined) newHsl.s = s;
        if (l !== undefined) newHsl.l = l;
        if (alpha !== undefined) newHsl.alpha = alpha;

        const newColor = colorUtils.hslToHex(newHsl);
        
        setMainColor(newColor, { immediate: true });
    }, [colorData, setMainColor]);

    // Handlers específicos para cada slider que usan los callbacks de arriba
    const handleSaturationChange = useCallback((values) => onValueChange({ s: values[0] }), [onValueChange]);
    const handleLightnessChange = useCallback((values) => onValueChange({ l: values[0] }), [onValueChange]);
    const handleAlphaChange = useCallback((values) => onValueChange({ alpha: values[0] }), [onValueChange]);

    const handleSaturationCommit = useCallback((values) => onValueCommit({ s: values[0] }), [onValueCommit]);
    const handleLightnessCommit = useCallback((values) => onValueCommit({ l: values[0] }), [onValueCommit]);
    const handleAlphaCommit = useCallback((values) => onValueCommit({ alpha: values[0] }), [onValueCommit]);

    const handleReset = useCallback(() => {
        if (!mainColorHex) return;
        
        const mainColorHsl = colorUtils.hexToHsl(mainColorHex);
        
        const pureHsl = {
            h: mainColorHsl.h,
            s: 100,
            l: 50,
            alpha: mainColorHsl.alpha
        };
        
        const pureColor = colorUtils.hslToHex(pureHsl);
        
        setMainColor(pureColor, { immediate: true });
    }, [mainColorHex, setMainColor]);

    if (!colorData) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-4 sm:gap-5 w-full">
            <div className="flex-shrink-0">
                <ColorSwatch
                    color={visualColorHex}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 rounded-lg border-2 border-none"
                />
            </div>
            <div className="flex flex-col gap-4 sm:gap-5 w-full items-center">
                <SliderWithLabel
                    label={t("context.tags.saturation")}
                    value={sliderValues.saturation}
                    onValueChange={handleSaturationChange}
                    onValueCommit={handleSaturationCommit} 
                />
                <SliderWithLabel
                    label={t("context.tags.lightness")}
                    value={sliderValues.lightness}
                    onValueChange={handleLightnessChange}
                    onValueCommit={handleLightnessCommit} 
                />
                <SliderWithLabel
                    label={t("context.tags.opacity")}
                    value={sliderValues.alpha}
                    onValueChange={handleAlphaChange}
                    onValueCommit={handleAlphaCommit}
                />
            </div>
            <Button
                onClick={handleReset}
                variant="outline"
                className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[180px] mt-2 text-sm"
            >
                {t("button.clean")}
            </Button>
        </div>
    );
});

ColorSliders.displayName = 'ColorSliders';