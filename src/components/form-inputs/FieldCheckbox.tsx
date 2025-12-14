import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import type { CheckboxFieldProps } from "./types";

/**
 * Form field component for checkboxes
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @param text - Optional checkbox text label
 * @example
 * ```tsx
 * <FieldCheckbox
 *   control={form.control}
 *   name="agree"
 *   label="Terms"
 *   text="I agree to the terms and conditions"
 * />
 * ```
 */
function FieldCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  description,
  text,
}: CheckboxFieldProps<T>) {
  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel>
                {text || label}
                <FieldDescription>{description}</FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldLabel>
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}

export default FieldCheckbox;
