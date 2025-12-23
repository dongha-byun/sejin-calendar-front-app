
interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
}

export default function ListCheckBox({onChange, checked} : Props) {
    return (
        <input type="checkbox"
            className="form-checkbox w-4 h-4 transition duration-150 ease-in-out items-center cursor-pointer"
            checked={checked || false}
            onChange={onChange}/>
    );
}