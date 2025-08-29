"use client";

import React, { useMemo } from 'react';
import { usePreferences } from "@/context/PreferencesContext";
import { ColorProvider } from './context/ColorContext';
import { PaletteProvider } from '@/context/PaletteContext';
import { ColorCalculationsProvider } from '@/context/ColorCalculationProviders';
import { useView } from "@/context/ViewContext";

import Navbar from "@/components/Navbar";
import ViewsGeneral from "@/components/ViewsGeneral";
import Footer from "@/components/Footer";
import Artist from "@/layout/ArtistLeft";
import Developer from "@/layout/DeveloperLeft";
import Designer from "@/layout/DesignerLeft";
import Settings from "@/layout/Settings";

import { Card, CardContent } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Wand2 } from "lucide-react";

const leftViewComponents = {
  artist: <Artist />,
  developer: <Developer />,
  designer: <Designer />,
  settings: <Settings />,
};

const DefaultView = () => (
  <div className="flex flex-col items-center justify-center h-full text-white opacity-50">
    <Wand2 className="h-16 w-16 mb-4 hidden md:block" />
    <p className="text-xl text-center px-4 hidden md:block">Selecciona una vista para comenzar</p>
  </div>
);

function App() {
  const { preferences } = usePreferences();
  const { activeView } = useView();

  const LeftViewComponent = useMemo(() => {
    return leftViewComponents[activeView] || <DefaultView />;
  }, [activeView]);

  return (
    <TooltipProvider>
      <ColorProvider>
        <ColorCalculationsProvider>
          <PaletteProvider>
            <main className="flex flex-col items-center justify-center min-h-screen p-4 selection:bg-slate-400 dark:selection:bg-gray-500">
              <div className="page-container bg-white dark:bg-neutral-900 w-full max-w-screen-2xl mx-auto rounded-xl grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-[auto_auto] lg:gap-8 bg-black shadow-lg">
                <Card className="bg-neutral-200 dark:bg-neutral-800 md:h-[615px] md:m-4 p-1 rounded-lg flex flex-col justify-between border-none">
                  <aside className="flex flex-col h-full my-2 mx-1 overflow-hidden">
                    <Navbar />
                      {LeftViewComponent}
                  </aside>
                </Card>

                <Card className="bg-neutral-200 dark:bg-neutral-800 md:h-[615px] md:m-4 p-1 rounded-lg flex flex-col justify-between border-none">
                  <aside className="flex flex-col h-full my-2 mx-1 overflow-hidden">
                    <ViewsGeneral />
                  </aside>
                </Card>
                
                {preferences.enableFooter && (
                  <div className="md:col-span-2">
                    <Card className="bg-blue-800 md:mx-4 p-2 rounded-lg md:block border-none">
                      <CardContent className="bg-red-500 h-[150px] rounded-lg p-2">
                        <Footer />
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </main>
          </PaletteProvider>
        </ColorCalculationsProvider>
      </ColorProvider>
    </TooltipProvider>
  );
}

export default App;