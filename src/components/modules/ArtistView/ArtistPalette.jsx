"use client";

import React, { useCallback } from 'react';
import { usePalettes } from '@/context/PaletteContext';
import { useIsColorUpdating } from '@/context/ColorContext';
import { ColorSwatch } from "@/components/ColorSwatch";
import { useTranslation } from 'react-i18next';

export const ArtistPalette = () => {
    const { palettes } = usePalettes();
    
    const isUpdating = useIsColorUpdating();
    
    const { t } = useTranslation();

    const renderPalette = useCallback((colors, title) => (
        <div className="flex flex-col gap-2 p-2 rounded-md bg-white dark:bg-neutral-800">
            <h4 className="dark:text-white text-black text-sm font-bold">{title}</h4>
            <div className="flex gap-2">
                {colors.map((color, index) => (
                    <ColorSwatch
                        key={`${title}-${index}-${color}`}
                        color={color}
                    />
                ))}
            </div>
        </div>
    ), []);

    if (isUpdating || !palettes) {
        return (
            <div className="p-4 flex items-center justify-center">
                <div className="text-gray-500">{t("context.palette.generatingPalettes")}</div>
            </div>
        );
    }

    return (
        <div className="p-4 flex flex-col gap-4">
            {renderPalette(palettes.scale, t('context.palette.colorScale'))}
            {renderPalette(palettes.complementary, t('context.palette.complementaryPalette'))}
            {renderPalette(palettes.analogous, t('context.palette.analogPalette'))}
            {renderPalette(palettes.triadic, t('context.palette.triadicPalette'))}
        </div>
    );
};

export default ArtistPalette;