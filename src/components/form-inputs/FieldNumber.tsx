import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { NumberFieldProps } from "./types";

/**
 * Form field component for number inputs
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @param htmlFor - HTML for attribute
 * @param inputId - Input element ID
 * @param placeholder - Placeholder text
 * @param min - Minimum value
 * @param max - Maximum value
 * @param step - Step increment
 * @example
 * ```tsx
 * <FieldNumber
 *   control={form.control}
 *   name="age"
 *   htmlFor="age"
 *   inputId="age"
 *   label="Age"
 *   min={0}
 *   max={120}
 * />
 * ```
 */
export function FieldNumber<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  htmlFor,
  inputId,
  placeholder = "Enter number",
  min,
  max,
  step,
}: NumberFieldProps<T>) {
  return (
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
                type="number"
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
              <FieldDescription>{description}</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}

