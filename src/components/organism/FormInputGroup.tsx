import React from "react";
import { Control, Controller } from "react-hook-form";
import TextInput from "../atoms/TextInput";

interface Props {
  name: string;
  control?: Control<any> | undefined;
  value?: string | undefined;
  onChange?:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  errMessage?: string;
  placeholder?: string;
  resetValidate?: () => void;
  type?: string;
  id?: string;
  placeText?: string;
}

const FormInputGroup = ({ name, control, resetValidate, ...rest }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextInput
          onChange={(text) => {
            onChange(text);
            resetValidate && resetValidate();
          }}
          value={value}
          {...rest}
        />
      )}
    />
  );
};

export default FormInputGroup;
