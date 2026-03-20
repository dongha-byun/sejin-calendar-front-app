interface Props {
    children: React.ReactNode;
}

export default function PageHeader({ children }: Props) {
    return (
        <div className="sticky top-0 z-10 bg-gray-100 pb-2">
            <h1 className="text-base font-semibold">{children}</h1>
        </div>
    );
}
