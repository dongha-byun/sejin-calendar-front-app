
interface Props {
    children: React.ReactNode;
    additionalClasses?: string;
}

export default function CommonTd({ children, additionalClasses }: Props) {
    return (
        <td className={`border px-2 py-1 whitespace-nowrap ${additionalClasses}`}>
            {children}
        </td>
    );
}