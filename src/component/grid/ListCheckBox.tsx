
interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}

export default function ListCheckBox({onChange, checked} : Props) {
    return (
        <td className="border px-2 py-1 text-center">
            <input type="checkbox"
                className="form-checkbox transition duration-150 ease-in-out items-center"
                checked={checked || false}
                onChange={onChange}/>
        </td>
    );
}