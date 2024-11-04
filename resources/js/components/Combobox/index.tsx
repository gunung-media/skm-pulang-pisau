import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

// Frameworks data
const frameworks = [
    { value: 'next.js', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt.js', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
];

export function ComboboxDemo() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFrameworks = frameworks.filter((framework) =>
        framework.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative ">
            <button
                onClick={(e) => {
                    e.preventDefault()
                    setOpen(!open)
                }}
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-main p-2 border-border border-2 rounded flex items-center"
            >
                {value
                    ? frameworks.find((framework) => framework.value === value)?.label
                    : 'Select framework...'}
                <ChevronsUpDown color="black" className="ml-2 h-4 w-4 shrink-0" />
            </button>
            {open && (
                <div className="absolute mt-1 w-full border-border border-2 bg-main rounded shadow-lg">
                    <input
                        type="text"
                        placeholder="Search framework..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border-border border-b-2 focus:outline-none bg-main placeholder:text-text"
                    />
                    <div className="max-h-40 overflow-y-auto p-2">
                        {filteredFrameworks.length > 0 ? (
                            filteredFrameworks.map((framework) => (
                                <div
                                    key={framework.value}
                                    onClick={() => {
                                        setValue(framework.value === value ? '' : framework.value);
                                        setOpen(false);
                                        setSearchTerm('');
                                    }}
                                    className={`flex items-center p-2 cursor-pointer hover:border-border hover:border-2 rounded-base`}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${value === framework.value ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    />
                                    {framework.label}
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-gray-500">No framework found.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

