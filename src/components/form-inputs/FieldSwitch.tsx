import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import type { BaseFieldProps } from "./types";

/**
 * Form field component for switches
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @example
 * ```tsx
 * <FieldSwitch
 *   control={form.control}
 *   name="notifications"
 *   label="Enable notifications"
 * />
 * ```
 */
function FieldSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: BaseFieldProps<T>) {
  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal">
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel>
                {label}
                <FieldDescription>{description}</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldLabel>
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}

export default FieldSwitch;
