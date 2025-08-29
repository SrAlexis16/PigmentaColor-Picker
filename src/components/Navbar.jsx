"use client";

import { useState } from 'react';
import { Menu, Bolt, Sun, Moon, X } from "lucide-react"
import { Paintbrush, Laptop, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from 'react-i18next';

import { usePreferences } from "@/context/PreferencesContext";
import { useView } from "@/context/ViewContext"; 

function Navbar() {
  const { setActiveView } = useView();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { setTheme } = usePreferences();

  return (
    <TooltipProvider>
      <nav className="relative p-1 md:p-4 rounded-lg">
        {/* Contenedor principal de la barra de navegación */}
        <div className="flex w-full items-center justify-between">
          <ul className="flex items-center">
            {/* Botón de hamburguesa para móviles con Dropdown Menu */}
            <li className="lg:hidden text-white bg-neutral-300 p-1 md:p-2 rounded-md">
              <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start" className="w-48 bg-white text-black mt-4 rounded-b-lg">
                  <DropdownMenuItem className="p-2 gap-3 hover:bg-gray-200 cursor-pointer" onClick={() => setActiveView("settings")}>
                    <Bolt className="text-black" />
                    {t("navbarTitle.settings")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 gap-3 hover:bg-gray-200 cursor-pointer" onClick={() => setTheme('light')}>
                    <Sun className="text-black" />
                    {t("navbarTitle.mode.light")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2 gap-3 hover:bg-gray-200 cursor-pointer" onClick={() => setTheme('dark')}>
                    <Moon className="text-black" />
                    {t("navbarTitle.mode.dark")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            {/* Opciones del menú principal (Modos y Ajustes) para desktop */}
            <ul className="hidden lg:flex text-white bg-neutral-300 dark:bg-neutral-700 gap-3 p-2 rounded-md">
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={() => setActiveView("settings")}
                      className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95">
                      <Bolt />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("navbarTitle.settings")}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95" onClick={() => setTheme('light')}>
                      <Sun />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("navbarTitle.mode.light")}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"  onClick={() => setTheme('dark')}>
                      <Moon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("navbarTitle.mode.dark")}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            </ul>
          </ul>
          {/* Íconos de perfil (Diseñador, Desarrollador, Artista) - Visibles siempre en móviles y desktop */}
          <ul className="text-white bg-neutral-300 dark:bg-neutral-700 flex p-1 md:p-2 gap-1 md:gap-3 rounded-md">
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                  onClick={() => setActiveView("designer")}
                    
                    className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95">
                    <Paintbrush />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("navbarTitle.viewDesigner")}</p>
                </TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={() => setActiveView("developer")}
                    className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95">
                    <Laptop />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("navbarTitle.viewDeveloper")}</p>
                </TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                  onClick={() => setActiveView("artist")}
                    
                    className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95">
                    <Palette />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("navbarTitle.viewArtist")}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          </ul>
        </div>
      </nav>
    </TooltipProvider>
  )
}

export default Navbar