
export default function CommonTh({ children }: { children: React.ReactNode }) {
    return (
        <th className="border px-2 py-1 whitespace-nowrap">{children}</th>
    );
}