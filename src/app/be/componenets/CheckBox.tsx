export default function CheckBox({checked,setChecked } : {checked: boolean, setChecked: any}) {
    const handleChange = () => {
        setChecked(!checked);
    };
    return (
        <div
            className="mb-4 block w-32 p-3 rounded bg-gray-200 border border-transparent focus:outline-none">
            Outdoor
            <input
                className={"ml-4 mt-0"}
                type="checkbox"
                checked={checked}
                onChange={handleChange}
            />
        </div>

    );
}
