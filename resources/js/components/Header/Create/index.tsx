import { Menu, Transition } from "@headlessui/react";
import Icon from "@/components/Icon";
import { router } from "@inertiajs/react";
import { IconNames } from "@/constants/icon";

type CreateProps = {};

const Create = ({ }: CreateProps) => {
    const buttons: { title: string, icon: IconNames, onClick: any }[] = [
        {
            title: "Jenis Pelayanan",
            icon: "puzzle",
            onClick: () => router.visit(route('admin.service.create')),
        },
        {
            title: "Tipe Pertanyaan",
            icon: "bag",
            onClick: () => router.visit(route('admin.questionType.create')),
        },
        {
            title: "Pertanyaan",
            icon: "projects",
            onClick: () => router.visit(route('admin.question.create')),
        },
    ];

    return (
        <Menu className="relative" as="div">
            <Menu.Button className="btn-purple btn-medium px-5 md:!bg-transparent md:border-none md:w-6 md:h-6 md:p-0 md:text-0">
                <Icon className="md:!m-0" name="add-circle" />
                <span>Create new</span>
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute top-full right-0 w-[14.69rem] mt-2.5 py-2 border border-n-1 rounded-sm bg-white shadow-primary-4 dark:bg-n-1 dark:border-white">
                    {buttons.map((button, index) => (
                        <Menu.Item
                            className="flex items-center w-full h-10 mb-1.5 px-6.5 text-sm font-bold last:mb-0 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
                            key={index}
                            as="button"
                            onClick={button.onClick}
                        >
                            <Icon
                                className="-mt-0.25 mr-3 dark:fill-white"
                                name={button.icon}
                            />
                            {button.title}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Create;
