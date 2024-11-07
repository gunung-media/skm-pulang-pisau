import { FC, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

type props = {
    name: string
    items: string[]
    baseValue?: string
    onChange: (value: string) => void
}

export const Combobox: FC<props> = ({ items, name, baseValue, onChange }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(baseValue ?? '');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="relative z-20">
            <button
                onClick={(e) => {
                    e.preventDefault()
                    setOpen(!open)
                }}
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-main p-2 border-border border-2 rounded flex items-center z-0"
            >
                {value
                    ? items.find((item) => item === value)
                    : `Pilih ${name}`
                }
                <ChevronsUpDown color="black" className="ml-2 h-4 w-4 shrink-0" />
            </button>
            {open && (
                <div className="absolute mt-1 w-full border-border border-2 bg-main rounded shadow-lg z-50">
                    <input
                        type="text"
                        placeholder={`Cari ${name}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border-border border-b-2 focus:outline-none bg-main placeholder:text-text"
                    />
                    <div className="max-h-40 overflow-y-auto p-2">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, key) => (
                                <div
                                    key={key}
                                    onClick={() => {
                                        setValue(item === value ? '' : item);
                                        onChange(item === value ? '' : item);
                                        setOpen(false);
                                        setSearchTerm('');
                                    }}
                                    className={`flex items-center p-2 cursor-pointer hover:border-border hover:border-2 rounded-base`}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${value === item ? 'opacity-100' : 'opacity-0'}`}
                                    />
                                    {item}
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-gray-500">{`Tidak ditemukan ${name}`}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

