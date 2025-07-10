
interface FormRowProps {
  children: React.ReactNode;
  full?: boolean;
}

export default function FormRow({ children, full }: FormRowProps) {
  return (
    <div className={`${full ? "w-full" : "col-span-3 flex mb-2 gap-4 "}`}>
      {children}
    </div>
  );
}
