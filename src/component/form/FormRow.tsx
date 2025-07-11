
interface FormRowProps {
  children: React.ReactNode;
  full?: boolean;
}

export default function FormRow({ children, full }: FormRowProps) {
  return (
    <div className={`${full ? "w-full" : "col-span-3 flex gap-4 "}`}>
      {children}
    </div>
  );
}
