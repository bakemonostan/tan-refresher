import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { DatePickerFieldProps } from "./types";

/**
 * Form field component for date picker
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @param placeholder - Placeholder text
 * @example
 * ```tsx
 * <FieldDatePicker
 *   control={form.control}
 *   name="birthDate"
 *   label="Date of Birth"
 *   placeholder="Select date"
 * />
 * ```
 */
export function FieldDatePicker<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  placeholder = "Select date",
}: DatePickerFieldProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>{label}</FieldLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-foreground">
                    <span className={field.value ? "" : "text-muted-foreground"}>
                      {field.value
                        ? new Date(field.value).toLocaleDateString()
                        : placeholder}
                    </span>
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      field.onChange(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FieldDescription>{description}</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}

