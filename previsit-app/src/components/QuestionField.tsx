import { QuestionFieldProps } from "@/lib/types";

export const QuestionField = ({
  question,
  value,
  onChange,
}: QuestionFieldProps) => {
  const { key, label, type, options = [], isRequired } = question;
  const radioOptions = options as { value: string; label: string }[];
  const checkboxOptions = options as string[];

  // Optional: render a warning if no options provided
  if ((type === "radio" || type === "checkbox") && options.length === 0) {
    return (
      <div className="text-red-500 font-medium">
        No options provided for: {label}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={key} className="text-sm font-medium text-gray-800">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={key}
          value={value as string}
          onChange={(e) => onChange(key, e.target.value)}
          className="border rounded-lg px-3 py-2 shadow-sm min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      ) : type === "radio" ? (
        <div className="flex flex-col gap-2 pl-2">
          {radioOptions.map((opt) => (
            <label
              key={`${key}-${opt.value}`}
              className="inline-flex items-center gap-2"
            >
              <input
                type="radio"
                name={key}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(key, opt.value)}
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      ) : type === "checkbox" ? (
        <div className="flex flex-col gap-2 pl-2">
          {checkboxOptions.map((opt) => (
            <label
              key={`${key}-${opt}`}
              className="inline-flex items-center gap-2"
            >
              <input
                type="checkbox"
                name={`${key}-${opt}`}
                checked={(value as string[]).includes(opt)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  const newValue = checked
                    ? [...(value as string[]), opt]
                    : (value as string[]).filter((v) => v !== opt);
                  onChange(key, newValue);
                }}
              />
              {opt}
            </label>
          ))}
        </div>
      ) : (
        <input
          id={key}
          type={type}
          value={value as string}
          onChange={(e) => onChange(key, e.target.value)}
          className="border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      )}
    </div>
  );
};
