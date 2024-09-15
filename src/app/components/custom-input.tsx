import React, { useId, forwardRef, ChangeEventHandler } from "react";
import { UseFormRegister } from "react-hook-form";

interface IProps {
  label: string;
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  register?: UseFormRegister<any>;
  name: string;
  rules?: Record<string, any>;
  required?: boolean;
  defaultValue?: string;
}

const CustomInput = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const {
    label,
    placeholder,
    onChange,
    type = "text",
    register,
    required,
    name,
    rules,
  } = props;
  const identifier = useId();

  return (
    <div className="flex flex-col">
      <label htmlFor={identifier} className="font-medium text-sm mb-1">
        {label} {required && <span className="text-[#EB5757]"> *</span>}
      </label>

      <input
        ref={ref}
        type={type}
        id={identifier}
        placeholder={placeholder}
        className="bg-input-bg border border-[#E5E9F1] h-[44px] rounded-xl px-3 py-1 placeholder:text-sm"
        onChange={onChange}
        {...(register && register(name, { ...rules }))}
      />
    </div>
  );
});

CustomInput.displayName = "CustomInput";

export default CustomInput;
