import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { RadioGroupFieldProps } from "./types";

/**
 * Form field component for radio button groups
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @param items - Array of radio options
 * @example
 * ```tsx
 * <FieldRadioButton
 *   control={form.control}
 *   name="size"
 *   items={["Small", "Medium", "Large"]}
 *   label="Size"
 * />
 * ```
 */
function FieldRadioButton<T extends FieldValues>({
  control,
  name,
  label,
  description,
  items,
}: RadioGroupFieldProps<T>) {
  return (
    <FieldSet>
      <FieldLegend>{label}</FieldLegend>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}>
                {items.map((item) => (
                  <Field
                    key={item}
                    orientation="horizontal">
                    <RadioGroupItem
                      value={item}
                      id={item}
                    />
                    <FieldLabel htmlFor={item}>{item}</FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
              <FieldDescription>{description}</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}

export default FieldRadioButton;
