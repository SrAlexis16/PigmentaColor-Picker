"use client";

import { useTranslation } from 'react-i18next';
import React from "react";
import { 
    useHexColor,
    useRgbaColor,
    useHslColor,
    useCmykColor,
    useCielabColor,
    useLuminance,
    useSaturation,
    useContrastRatios
} from "@/context/ColorCalculationProviders";
import { useIsColorUpdating } from "@/context/ColorContext";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@radix-ui/react-tooltip';
import { Info, Loader2 } from "lucide-react";

export const DeveloperColorInfo = () => {
    const { t } = useTranslation();
    
    const hex = useHexColor();
    const rgba = useRgbaColor();
    const hsl = useHslColor();
    const cmyk = useCmykColor();
    const cielab = useCielabColor();

    const luminance = useLuminance();
    const saturation = useSaturation();

    const { contrastWhite, contrastBlack } = useContrastRatios();

    const isUpdating = useIsColorUpdating();


    const renderValue = (value) => {
        if (isUpdating) {
            return <Loader2 className="h-4 w-4 animate-spin inline-block mr-2" />;
        }
        return <span className="font-mono font-medium">{value}</span>;
    };

    return (
        <div className="w-full h-full p-2">
            <Card className="h-[370px] overflow-y-auto">
                <CardContent className="flex flex-col justify-start p-5 text-sm">
                    <TooltipProvider>
                        <div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 mb-2 cursor-pointer group">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                            {t("context.tags.colorConversions")}
                                        </h3>
                                        <Info className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="top"
                                    className="z-50 overflow-hidden rounded-lg bg-popover px-3 py-2 text-sm text-popover-foreground shadow-lg border max-w-xs"
                                >
                                    <div className="space-y-1">
                                        <p className="font-medium text-primary">{t("context.tags.colorConversions")}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {t("tooltips.colorConversions.description1")}
                                            {t("tooltips.colorConversions.description2")}
                                        </p>
                                        <div className="text-xs text-muted-foreground mt-2">
                                            <span className="font-medium">• HEX:</span> {t("tooltips.colorConversions.HEX")} <br/>
                                            <span className="font-medium">• RGBA:</span> {t("tooltips.colorConversions.RGBA")} <br/>
                                            <span className="font-medium">• HSL:</span> {t("tooltips.colorConversions.HSL")} <br/>
                                            <span className="font-medium">• CMYK:</span> {t("tooltips.colorConversions.CMYK")} <br/>
                                            <span className="font-medium">• CIELAB: {t("tooltips.colorConversions.CIELAB")}</span>
                                        </div>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
                                <li><span className="text-muted-foreground">HEX:</span> {renderValue(hex)}</li>
                                <li><span className="text-muted-foreground">RGBA:</span> {renderValue(rgba)}</li>
                                <li><span className="text-muted-foreground">HSL:</span> {renderValue(hsl)}</li>
                                <li><span className="text-muted-foreground">CMYK:</span> {renderValue(cmyk)}</li>
                                <li><span className="text-muted-foreground">CIELAB:</span> {renderValue(cielab)}</li>
                            </ul>
                        </div>

                        <Separator className="my-3" />

                        <div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 mb-2 cursor-pointer group">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                            {t("context.tags.colorProperties")}
                                        </h3>
                                        <Info className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="top"
                                    className="z-50 overflow-hidden rounded-lg bg-popover px-3 py-2 text-sm text-popover-foreground shadow-lg border max-w-xs"
                                >
                                    <div className="space-y-1">
                                        <p className="font-medium text-primary">{t("context.tags.colorProperties")}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {t("tooltips.colorProperties.description1")}
                                        </p>
                                        <div className="text-xs text-muted-foreground mt-2">
                                            <span className="font-medium">• {t("context.tags.lightness")}:</span> {t("tooltips.colorProperties.text1")} <br/>
                                            <span className="font-medium">• {t("context.tags.saturation")}:</span> {t("tooltips.colorProperties.text2")} <br/>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1 italic">
                                            {t("tooltips.colorProperties.description2")}
                                        </p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                                <li><span className="text-muted-foreground">{t("context.tags.lightness")}:</span> {renderValue(luminance)}</li>
                                <li><span className="text-muted-foreground">{t("context.tags.saturation")}:</span> {renderValue(saturation)}</li>
                            </ul>
                        </div>
                        
                        <Separator className="my-3" />

                        <div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 mb-2 cursor-pointer group">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                            {t("context.tags.contrastChecks")}
                                        </h3>
                                        <Info className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="top"
                                    className="z-50 overflow-hidden rounded-lg bg-popover px-3 py-2 text-sm text-popover-foreground shadow-lg border max-w-xs"
                                >
                                    <div className="space-y-1">
                                        <p className="font-medium text-primary">{t("context.tags.contrastChecks")}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {t("tooltips.contrastChecks.description1")}
                                        </p>
                                        <div className="text-xs text-muted-foreground mt-2">
                                            <span className="font-medium"> WCAG:</span><br/>
                                            • 3:1 - AA<br/>
                                            • 4.5:1 - Normal AA<br/>
                                            • 7:1 - AAA<br/>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1 italic">
                                            {t("tooltips.contrastChecks.description2")}
                                        </p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                                <li><span className="text-muted-foreground">{t("context.tags.contrastWhite")}:</span> {renderValue(contrastWhite)}</li>
                                <li><span className="text-muted-foreground">{t("context.tags.contrastBlack")}:</span> {renderValue(contrastBlack)}</li>
                            </ul>
                        </div>
                    </TooltipProvider>
                </CardContent>
            </Card>
        </div>
    );
};