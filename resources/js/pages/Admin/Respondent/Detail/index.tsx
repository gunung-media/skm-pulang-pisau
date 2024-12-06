import { useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import AuthenticatedLayout from "@/layouts/Authenticated";
import { PageProps } from "@/types";
import { RespondentType } from "@/features/Respondent";
import { ResponseType } from "@/features/Response";
import { IconNames } from "@/constants/icon";
import { toIndonesian } from "@/utils/date";
import { faFaceFrown, faFaceGrin, faFaceGrinStars, faFaceMeh } from '@fortawesome/free-solid-svg-icons';
import { FaIcon } from "@/components/FontAwesomeIcon";

type InfoMap = {
    title: string,
    icon: IconNames,
    content: keyof RespondentType
}[]

const fasIcons = {
    'text-red-500 ': faFaceFrown,
    'text-yellow-500 ': faFaceMeh,
    'text-blue-500 ': faFaceGrin,
    'text-purple-500 ': faFaceGrinStars
};


export default function ProjectsDetailsPage({ respondent }: PageProps & { respondent: RespondentType }) {
    const [visible, setVisible] = useState<boolean>(false);
    const respondentInfoMap: InfoMap = [
        {
            title: "Jenis Kelamin",
            icon: "team",
            content: "gender",
        },
        {
            title: "Edukasi Terakhir",
            icon: "earth",
            content: "education",
        },
        {
            title: "Pekerjaan",
            icon: "certificate",
            content: "jobs",
        },
        {
            title: "Umur",
            icon: "apps",
            content: "age",
        },
        {
            title: "Jenis Pelayanan",
            icon: "notification-bell",
            content: "service",
        },
        {
            title: "Tanggal Mengisi",
            icon: "calendar",
            content: "created_at",
        },
    ]

    return (
        <AuthenticatedLayout title={`Respondent ${respondent.name}`} back={route('admin.respondent.index')} >
            <div className="flex card">
                <div className="relative shrink-0 w-96 pt-19 px-5 pb-7 border-r border-n-1 4xl:w-80 lg:border-none md:pt-12 dark:border-white">
                    <div className="w-21 h-21 mx-auto mb-3 p-5 bg-background rounded-full">
                        <Image
                            className="w-full"
                            src={`https://ui-avatars.com/api/?rounded=true&name=${respondent.name}`}
                            width={46}
                            height={46}
                            alt="Logo"
                        />
                    </div>
                    <div className="mb-1 text-center text-h5">
                        {respondent.name}
                    </div>
                    <div className="mb-10 text-center text-sm md:mb-6">
                        Index Kepuasan: {parseFloat(respondent.index_satisfaction ?? "").toFixed(2)}
                    </div>
                    <div>
                        {respondentInfoMap.map((info) => (
                            <div
                                className={`flex items-center w-full pl-7 py-4 pr-4 transition-colors tap-highlight-color hover:bg-background/60 dark:hover:bg-n-2`}
                            >
                                <Icon
                                    className="shrink-0 icon-18 mr-6 dark:fill-white"
                                    name={info.icon}
                                />
                                <div className="grow text-left">
                                    <div className="mb-1 text-sm font-bold">
                                        {info.title}
                                    </div>
                                    <div className="text-xs">
                                        {info.content === "created_at"
                                            ? toIndonesian(String(respondent[info.content] ?? ""))
                                            : Array.isArray(respondent[info.content])
                                                ? (respondent[info.content] as unknown as ResponseType[]).map((item: ResponseType) => (
                                                    <span key={item.id}>{item.question_id}</span>
                                                ))
                                                // @ts-expect-error
                                                : typeof respondent[info.content] === 'object' ? respondent[info.content]?.title :
                                                    String(respondent[info.content] ?? "")
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={`flex flex-col grow pt-6 pl-10 pr-6 pb-7 bg-white overflow-auto  scroll-smooth py-8 px-5 transition-opacity md:pt-6 dark:bg-n-1 visible ${visible ? "!opacity-100" : ""}`} >
                    <button
                        className="hidden items-center mb-6 text-sm font-bold text-purple-1 tap-highlight-color"
                        onClick={() => setVisible(false)}
                    >
                        <Icon
                            className="icon-18 mr-2 fill-purple-1"
                            name="arrow-prev"
                        />
                        Back to the menu
                    </button>
                    <div className="py-5">
                        {respondent.responses!.map((response) => (
                            <div className="mb-10 last:mb-0" >
                                <div className="text-h6">{response.question!.position}</div>
                                <div className="text-n-2">{response.question!.question}</div>
                                <div className="flex gap-9 mt-5">
                                    {Object.entries(fasIcons).map(([color, icon], index) => (
                                        <FaIcon
                                            key={index}
                                            icon={icon}
                                            color={color}
                                            size="2x"
                                            isActive={(index + 1) === Number(response.answer)}
                                            disabled
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout >
    );
};

