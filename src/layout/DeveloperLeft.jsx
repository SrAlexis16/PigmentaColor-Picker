import { Card, CardTitle, CardContent} from "@/components/ui/card"
import { DeveloperColorInfo } from "@/components/modules/DeveloperView/DeveloperColorInfo";

import { useTranslation } from 'react-i18next';

export default function Developer() {
        const { t } = useTranslation(); 
    return(
        <Card className="text-white text-xl font-bold flex flex-col flex-grow mt-2 hidden md:block">
            <CardTitle className="text-white text-2xl lg:text-4xl mx-5 py- px-1 pb-2 rounded-md bg-neutral-900">
                <p> {t("context.view")} </p>
            </CardTitle>
            <CardContent className="text-black text-xl mx-5 mt-1 py-2 px-1 rounded-md bg-neutral-900 h-[400px] flex flex-col justify-between">
                <DeveloperColorInfo/>
            </CardContent>
        </Card>
    )
}