"use client";

import React, { useMemo } from 'react';
import { useView } from "@/context/ViewContext";
import { useTranslation } from "react-i18next";

import ArtistR from "@/views/ArtistRight";
import DeveloperR from "@/views/DeveloperRight";
import DesignerR from "@/views/DesignerRight";
import HelpCenter from "@/views/HelpCenter";

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Binoculars } from "lucide-react";

// Mapeo de vistas para evitar la recreación de componentes
const rightViewComponents = {
    designer: <DesignerR />,
    artist: <ArtistR />,
    developer: <DeveloperR />,
    settings: <HelpCenter />,
};

// Componente para la vista por defecto
const DefaultRightView = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center h-full text-white opacity-50">
            <p className="text-xl text-center px-4"> {t("context.render")} </p>
        </div>
    );
};

function ViewsGeneral() {
    const { t } = useTranslation(); 
    const { activeView } = useView();

    // Memoiza el componente de la vista derecha para que solo se renderice
    // cuando 'activeView' cambie
    const RightViewComponent = useMemo(() => {
        return rightViewComponents[activeView] || <DefaultRightView />;
    }, [activeView]);

    // Memoiza la etiqueta de la vista para que solo se recalcule cuando 'activeView' cambie
    const viewLabel = useMemo(() => {
        switch (activeView) {
            case "designer":
                return t("navbarTitle.viewDesigner");
            case "developer":
                return t("navbarTitle.viewDeveloper");
            case "artist":
                return t("navbarTitle.viewArtist");
            case "settings":
                return t("navbarTitle.helpCenter");
            default:
                return null;
        }
    }, [activeView, t]);

    return (
        <div className="flex flex-col h-full"> 
            <Card className="relative bg-neutral-300 dark:bg-neutral-700 p-1 md:p-4 rounded-lg border-none">
                <CardTitle className="flex w-full items-center justify-between">
                    <ul className="flex items-center gap-1 font-semibold">
                        <li className="sm:text-2xl lg:text-3xl py-2 px-1 rounded-md flex items-center gap-2 text-black">
                            <div className="sm:hidden block lg:block text-black dark:text-neutral-400"> <Binoculars className="h-4 w-4 lg:h-8 lg:w-8" /> </div>
                            <p className="text-black dark:text-neutral-400 sm:block md:hidden lg:hidden">{t("viewsTitle")}</p>
                            <p className="text-black dark:text-neutral-400 hidden md:block lg:block">{t("viewsTitleMD")}</p>
                        </li>
                        <li className="text-white dark:text-black sm:text-2xl lg:text-3xl py-2 px-2 bg-neutral-900 dark:bg-white rounded-md ">
                            {viewLabel}
                        </li>
                    </ul>
                </CardTitle>
            </Card>
            <Card className="text-white text-xl font-bold flex flex-col flex-grow mt-2">
                <CardContent className="flex-grow p-0">
                    {RightViewComponent}
                </CardContent>
            </Card>
        </div>
    );
}

export default ViewsGeneral;