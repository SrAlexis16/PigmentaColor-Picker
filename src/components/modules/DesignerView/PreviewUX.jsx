"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    useVisualColor,      
    useMainColor,        
    useIsColorUpdating   
} from '@/context/ColorContext';
import { usePreferences } from '@/context/PreferencesContext';
import { getContrastRatio, getDeltaE, isLight } from '@/lib/color/analysis';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Heart, MessageCircle, Star, User, Search, Settings, Menu } from "lucide-react";

const PreviewUX = () => {
    const { t } = useTranslation();
    
    const visualColor = useVisualColor();  
    const mainColor = useMainColor();        
    const isUpdating = useIsColorUpdating(); 
    
    const { theme } = usePreferences();
    const [activeTab, setActiveTab] = useState('home');

    const themeColors = useMemo(() => {
        const bg = theme === 'dark' ? '#141414' : '#FFFFFF';
        const cardBg = theme === 'dark' ? '#1f1f1f' : '#f8f9fa';
        const borderLightColor = theme === 'dark' ? '#333' : '#e1e5e9';
        return { backgroundColor: bg, cardBg, borderLightColor };
    }, [theme]);
    
    const accessibilityMetrics = useMemo(() => {
        if (!mainColor) {
            return { contrastRatio: 'N/A', deltaE: 'N/A' };
        }
        return {
            contrastRatio: getContrastRatio(mainColor, themeColors.backgroundColor),
            deltaE: getDeltaE(mainColor, themeColors.backgroundColor)
        };
    }, [mainColor, themeColors.backgroundColor]);

    // Propiedades visuales - usan visualColor para feedback inmediato
    const visualProperties = useMemo(() => {
        if (!visualColor) {
            return {
                isColorLight: false,
                textColor: '#FFFFFF',
                borderColor: 'transparent',
                lighterColor: 'transparent'
            };
        }
        
        const isColorLight = isLight(visualColor);
        return {
            isColorLight,
            textColor: isColorLight ? '#000000' : '#FFFFFF',
            borderColor: visualColor,
            lighterColor: `${visualColor}20`
        };
    }, [visualColor]);

    // Función WCAG
    const getWCAGStatus = useCallback((ratio) => {
        if (ratio === 'N/A') return { status: 'N/A', label: 'N/A' };
        const contrast = parseFloat(ratio);
        if (contrast >= 7.0) {
            return { status: 'Passed', label: 'AAA' };
        } else if (contrast >= 4.5) {
            return { status: 'Passed', label: 'AA' };
        } else if (contrast >= 3.0) {
            return { status: 'Low', label: 'AA (Large)' };
        } else {
            return { status: 'Failed', label: 'Failed' };
        }
    }, []);
    
    // Estado WCAG memoizado
    const wcagStatus = useMemo(() => 
        getWCAGStatus(accessibilityMetrics.contrastRatio), 
        [accessibilityMetrics.contrastRatio, getWCAGStatus]
    );
    
    // Clases de estado - constante
    const statusColorClass = useMemo(() => ({
        'Passed': 'text-green-600',
        'Low': 'text-yellow-500',
        'Failed': 'text-red-600',
        'N/A': 'text-gray-500'
    }), []);

    const handleTabClick = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    return (
        <div className="w-full h-full justify-between items-center p-2">
            <Card className="flex flex-col h-full w-full items-center p-4">
                <CardContent className="flex flex-col sm:gap-6 w-full h-full overflow-auto">

                    <div className="flex flex-col flex-1 p-4 border rounded-lg shadow-xl overflow hidden lg:block">
                        <h3 className="text-lg font-semibold mb-4 text-center">UX Preview</h3>
                        <div className="flex justify-between items-center p-3 mb-4 rounded-t-lg" 
                                style={{ 
                                    backgroundColor: visualProperties.borderColor, 
                                    color: visualProperties.textColor 
                                }}>
                            <div className="flex items-center gap-3">
                                <Menu className="h-5 w-5" />
                                <span className="font-semibold text-lg">ColorApp</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                <Settings className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="flex border-b mb-4" style={{ borderColor: themeColors.borderLightColor }}>
                            {['home', 'explore', 'profile'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabClick(tab)}
                                    className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                                        activeTab === tab 
                                            ? 'border-b-2 font-semibold' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    style={activeTab === tab ? { 
                                        borderBottomColor: visualProperties.borderColor,
                                        color: visualProperties.borderColor 
                                    } : {}}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto max-h-64">
                            <div className="border rounded-lg p-4" 
                                style={{ 
                                    backgroundColor: themeColors.cardBg, 
                                    borderColor: themeColors.borderLightColor 
                                }}>
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                                            style={{ backgroundColor: visualProperties.lighterColor }}>
                                        <User className="h-6 w-6" style={{ color: visualProperties.borderColor }} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm mb-1">Featured Content</h4>
                                        <p className="text-xs text-gray-600 mb-3">
                                            This is how your accent color looks in a typical card layout with mixed content.
                                        </p>
                                        <div className="flex items-center gap-4 text-xs">
                                            <button className="flex items-center gap-1" 
                                                    style={{ color: visualProperties.borderColor }}>
                                                <Heart className="h-4 w-4" /> Like
                                            </button>
                                            <button className="flex items-center gap-1" 
                                                    style={{ color: visualProperties.borderColor }}>
                                                <MessageCircle className="h-4 w-4" /> Comment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4" 
                                style={{ 
                                    backgroundColor: themeColors.cardBg, 
                                    borderColor: themeColors.borderLightColor 
                                }}>
                                <h4 className="font-semibold text-sm mb-3">Form Elements</h4>
                                <div className="space-y-3">
                                    <div>
                                        <Label className="text-xs mb-1 block" 
                                                style={{ color: visualProperties.borderColor }}>
                                                Email Address
                                        </Label>
                                        <input
                                            className="w-full border rounded-md p-2 text-xs focus:outline-none focus:ring-2"
                                            style={{ 
                                                borderColor: themeColors.borderLightColor,
                                                focusRingColor: visualProperties.borderColor 
                                            }}
                                            placeholder="Enter your email"
                                            disabled
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            style={{ 
                                                backgroundColor: visualProperties.borderColor, 
                                                color: visualProperties.textColor,
                                                border: 'none'
                                            }}
                                            className="text-xs px-4">
                                            Primary Action
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            style={{ 
                                                borderColor: visualProperties.borderColor, 
                                                color: visualProperties.borderColor 
                                            }} 
                                            className="text-xs px-4">
                                            Secondary
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg p-3" 
                                style={{ 
                                    backgroundColor: visualProperties.lighterColor, 
                                    borderLeft: `4px solid ${visualProperties.borderColor}` 
                                }}>
                                <div className="flex items-center gap-2">
                                    <Bell className="h-4 w-4" style={{ color: visualProperties.borderColor }} />
                                    <span className="text-xs font-medium" style={{ color: visualProperties.borderColor }}>
                                        Notification: Your color choice affects readability
                                    </span>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4" 
                                style={{ 
                                    backgroundColor: themeColors.cardBg, 
                                    borderColor: themeColors.borderLightColor 
                                }}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium">User Rating</span>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star 
                                                key={star} 
                                                className="h-3 w-3" 
                                                style={{ 
                                                    color: star <= 4 ? visualProperties.borderColor : '#e5e7eb',
                                                    fill: star <= 4 ? visualProperties.borderColor : 'transparent'
                                                }} 
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="h-2 rounded-full transition-all duration-300" 
                                        style={{ 
                                            backgroundColor: visualProperties.borderColor,
                                            width: '80%'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Accessibility Analysis - Usa mainColor para cálculos confirmados */}
                    <div className="flex flex-col flex-1 p-4 shadow-2xl rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-center">{t("text.accessibility")}</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-xs sm:text-sm">{t("context.tags.contrastRatio")}:</Label>
                                <span className={`text-base sm:text-xl font-bold ${statusColorClass[wcagStatus.status]}`}>
                                    {accessibilityMetrics.contrastRatio}:1
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <Label className="text-xs sm:text-sm">{t("context.tags.statusWCAG")}:</Label>
                                <span className={`text-base sm:text-xl font-bold ${statusColorClass[wcagStatus.status]}`}>
                                    {wcagStatus.label}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <Label className="text-xs sm:text-sm">{t("context.tags.colorDifference")}</Label>
                                <span className="text-base sm:text-xl font-bold">
                                    {accessibilityMetrics.deltaE}
                                </span>
                            </div>
                            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: themeColors.cardBg }}>
                                <Label className="text-xs font-semibold mb-2 block">{t("context.tags.visualImpact")}</Label>
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="w-4 h-4 rounded hidden lg:block" 
                                        style={{ backgroundColor: visualProperties.borderColor }}></div>
                                    <span>{t("context.tags.colorVisibility")}: </span>
                                    <span className={statusColorClass[wcagStatus.status]}>
                                        {wcagStatus.status === 'Passed' ? t("context.tags.colorCheckExcellent") : 
                                            wcagStatus.status === 'Low' ? t("context.tags.colorCheckModerate") : t("context.tags.colorCheckPoor")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PreviewUX;