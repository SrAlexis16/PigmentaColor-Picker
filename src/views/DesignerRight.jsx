import { DesignerColorWheel } from "@/components/modules/DesignerView/DesignerColorWheel";

import { CardTitle, CardContent} from "@/components/ui/card"

import { useTranslation } from 'react-i18next';

export default function DesingerR (){
    const { t } = useTranslation(); 

    return(
        <div>
        <CardTitle className="m-0 p-0 text-white text-2xl lg:text-4xl mx-5 px-1 pb-2 rounded-md bg-neutral-900">
            {t("context.picker")}
        </CardTitle>
        <CardContent className="text-black text-xl mx-5 mt-1 py-2 px-1 rounded-md bg-neutral-900 h-[400px] flex flex-col justify-between">
            <DesignerColorWheel />
        </CardContent>
        </div>
    )
}