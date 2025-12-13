import {
  type Path,
  type Control,
  type FieldValues,
  Controller,
} from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FieldInputProps<T extends FieldValues> extends Omit<
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name"
> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  htmlFor: string;
  inputId: string;
  type: "text" | "email" | "password" | "number";
  description?: string;
  placeholder?: string;
}

export function FieldInput<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  htmlFor,
  inputId,
  type = "text",
  placeholder = "Placeholder text",
}: FieldInputProps<T>) {
  return (
    <div className="">
      <FieldSet>
        <FieldGroup>
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
                <Input
                  {...field}
                  id={inputId}
                  type={type}
                  placeholder={placeholder}
                />
                <FieldDescription>{description}</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
