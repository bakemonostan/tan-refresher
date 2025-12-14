import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import type { SelectFieldProps } from "./types";

/**
 * Form field component for select dropdowns
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @param items - Array of select options
 * @param placeholder - Placeholder text
 * @param disabled - Disabled state
 * @example
 * ```tsx
 * <FieldSelect
 *   control={form.control}
 *   name="color"
 *   items={["Red", "Green", "Blue"]}
 *   label="Color"
 *   placeholder="Select a color"
 * />
 * ```
 */
function FieldSelect<T extends FieldValues>({
  name,
  items,
  control,
  label = "Label",
  placeholder = "Choose option",
  description,
  disabled = false,
}: SelectFieldProps<T>) {
  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>{label}</FieldLabel>
              <Select
                {...field}
                value={field.value}
                onValueChange={field.onChange}
                disabled={disabled}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldDescription>{description}</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}

export default FieldSelect;
