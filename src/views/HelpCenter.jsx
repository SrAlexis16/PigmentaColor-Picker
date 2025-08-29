import ContentDoc from "@/components/modules/DocumentationView/ContentDoc";

import { CardTitle, CardContent} from "@/components/ui/card"

import { useTranslation } from 'react-i18next';

export default function HelpCenter (){
    const { t } = useTranslation(); 
    return(
        <div>
            <CardTitle className="m-0 p-0 text-white text-2xl lg:text-4xl mx-5 px-1 pb-2 rounded-md bg-neutral-900">{t("navbarTitle.documentation")} </CardTitle>
            <CardContent className="ttext-black text-xl mx-5 mt-1 py-2 px-1 rounded-md bg-neutral-900 h-[400px] flex flex-row justify-between">
                <ContentDoc />
            </CardContent>
        </div>
    )
}