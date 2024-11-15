import { LucideProps, UserCheck, icons } from 'lucide-react';

interface IconProps extends LucideProps {
    name: keyof typeof icons;
}

const LucideIcon = ({ name, ...props }: IconProps) => {
    const LucideIcon = icons[name];


    return <LucideIcon {...props} />;
};

export default LucideIcon;
