import Select from "react-select";

interface Props {
  options: { value: string; label: string }[];
}

export default function SelectText({options}: Props) {
  return (
    <div className="w-72">
      <Select
        options={options}
        isClearable
        isSearchable
        placeholder=""
      />
    </div>
  );
}