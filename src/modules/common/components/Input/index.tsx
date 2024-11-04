import { FC } from "react";
import { Input as AntInput, InputProps as AntInputProps } from "antd";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type InputProps = Omit<AntInputProps, "ref">;

const Input: FC<InputProps> = (props) => {
  return <AntInput {...props} />;
};

type ControlledInputProps<
  FieldsType extends FieldValues = FieldValues,
  FieldName extends keyof FieldsType = keyof FieldsType
> = InputProps & {
  name: FieldName;
  control: Control<FieldsType>;
};

const Controlled = <FieldsType extends FieldValues = FieldValues>({
  name,
  control,
  ...restProps
}: ControlledInputProps<FieldsType>) => {
  const { field } = useController({ name: name as Path<FieldsType>, control });

  return <Input {...restProps} {...field} />;
};

export default Object.assign(Input, { Controlled });
