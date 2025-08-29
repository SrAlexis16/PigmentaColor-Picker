"use client";

import React, { useState, useEffect } from 'react';
import i18n from '@/i18';

import { usePreferences } from '@/context/PreferencesContext';

import GeneralSettings from "@/components/modules/SettingsView/GeneralSettings";
import LanguageSettings from "@/components/modules/SettingsView/LanguageSettings";
import FavoriteColors from "@/components/modules/SettingsView/FavoriteColors";

import { toast } from 'sonner';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useTranslation } from 'react-i18next';

const COLLAPSIBLE_TYPES = {
    FAVORITE_COLORS: 'favoriteColors',
    LANGUAGES: 'languages',
    GENERAL_SETTINGS: 'generalSettings',
};

export default function Settings() {
    const { t } = useTranslation(); 
    const { preferences: globalPreferences, updatePreferences } = usePreferences();
    const [localPreferences, setLocalPreferences] = useState(globalPreferences);
    const [activeCollapsible, setActiveCollapsible] = useState(null);

    useEffect(() => {
        setLocalPreferences(globalPreferences);
    }, [globalPreferences]);

    const updatePreference = (key, value) => {
        setLocalPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };
    
    const handleCollapsibleToggle = (collapsibleType) => {
        setActiveCollapsible(prev => 
            prev === collapsibleType ? null : collapsibleType
        );
    };

    const savePreferences = () => {
        updatePreferences(localPreferences);
        i18n.changeLanguage(localPreferences.language);

        toast.success(t('toast.preferencesSaved')); 
    };
    
    return (
        <div className="w-full h-full justify-between items-center p-2">
            <Card className="flex flex-col md:flex-row h-[370px] bg-white dark:bg-neutral-800 justify-center items-center">
                <CardContent className="flex flex-col justify-between gap-4 p-2 sm:p-3 w-full h-full">
                    <div className="flex flex-col gap-1 sm:gap-2 overflow-y-auto flex-1 min-h-0">
                        <FavoriteColors
                            isOpen={activeCollapsible === COLLAPSIBLE_TYPES.FAVORITE_COLORS}
                            onOpenChange={() => handleCollapsibleToggle(COLLAPSIBLE_TYPES.FAVORITE_COLORS)}
                        />

                        <LanguageSettings
                            isOpen={activeCollapsible === COLLAPSIBLE_TYPES.LANGUAGES}
                            onOpenChange={() => handleCollapsibleToggle(COLLAPSIBLE_TYPES.LANGUAGES)}
                            selectedLanguage={localPreferences.language}
                            handleLanguageToggle={(lang) => updatePreference('language', lang)}
                        />

                        <GeneralSettings
                            isOpen={activeCollapsible === COLLAPSIBLE_TYPES.GENERAL_SETTINGS}
                            onOpenChange={() => handleCollapsibleToggle(COLLAPSIBLE_TYPES.GENERAL_SETTINGS)}
                            enableFooter={localPreferences.enableFooter}
                            setEnableFooter={(value) => updatePreference("enableFooter", value)}
                            enableContrastChecker={localPreferences.enableContrastChecker}
                            setEnableContrastChecker={(value) => updatePreference('enableContrastChecker', value)}
                        />
                    </div>

                    <div className="flex-shrink-0 pt-2 mt-2">
                        <Separator className="bg-gray-700 dark:bg-gray-300 my-2" />
                        <div className="flex justify-end">
                            <Button
                                onClick={savePreferences}
                                className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-3 sm:px-4 py-2 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto"
                            >
                                {t("button.savePreferences")}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}