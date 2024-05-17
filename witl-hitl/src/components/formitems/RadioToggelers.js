import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function RadioToggelers({ options, onChange }) {
  return (
    <div className="radiotoggler shadow">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="bgType"
            value={option.value}
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
