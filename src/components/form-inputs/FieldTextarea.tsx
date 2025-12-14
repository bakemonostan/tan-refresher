import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Controller, type FieldValues } from "react-hook-form";
import type { TextFieldProps } from "./types";

interface FieldTextareaProps<T extends FieldValues> extends TextFieldProps<T> {
  rows?: number;
}

/**
 * Form field component for textarea inputs
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @param htmlFor - HTML for attribute
 * @param inputId - Input element ID
 * @param rows - Number of textarea rows
 * @param placeholder - Placeholder text
 * @example
 * ```tsx
 * <FieldTextarea
 *   control={form.control}
 *   name="description"
 *   htmlFor="description"
 *   inputId="description"
 *   label="Description"
 *   rows={5}
 * />
 * ```
 */
export function FieldTextarea<T extends FieldValues>({
  name,
  control,
  label = "Label",
  htmlFor,
  inputId,
  rows = 20,
  placeholder = "Placeholder text",
  description,
}: FieldTextareaProps<T>) {
  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
              <Textarea
                {...field}
                id={inputId}
                placeholder={placeholder}
                rows={rows}
                className="resize-none min-h-28"
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
