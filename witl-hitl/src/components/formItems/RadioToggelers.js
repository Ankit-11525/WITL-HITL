import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function RadioToggelers({ options,defaultValue, onChange }) {
  return (
    <div className="radiotoggler shadow">
      {options.map((option) => (
        <label key={option.value} 
        className="cursor-pointer">
          <input
            type="radio"
            name="bgType"
            value={option.value}
            defaultChecked={defaultValue==option.value}
            onClick={ev => onChange(ev.target.value)}
          ></input>
          <div>
            <FontAwesomeIcon icon={option.icon} />
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
