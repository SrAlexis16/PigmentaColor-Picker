import ColorMixer from "@/components/modules/ArtistView/ColorMixer"

import { CardTitle, CardContent } from "@/components/ui/card"

import { useTranslation } from 'react-i18next';

export default function ArtistR (){
    const { t } = useTranslation(); 
    const setMixedColor = '#727272';

    return(
        <div>
        <CardTitle className="text-white text-2xl lg:text-4xl mx-5 py- px-1 pb-2 rounded-md bg-neutral-900">
                <p> {t("context.picker")} </p>
            </CardTitle>
        <CardContent className="text-black text-xl mx-5 mt-1 py-2 px-1 rounded-md bg-neutral-900 h-[400px] flex flex-col justify-between">
            <ColorMixer onColorChange={setMixedColor }/>
        </CardContent>
        </div>
    )
}