import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import type { SliderFieldProps } from "./types";

/**
 * Form field component for sliders
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @param min - Minimum value (default: 0)
 * @param max - Maximum value (default: 100)
 * @param step - Step increment (default: 1)
 * @example
 * ```tsx
 * <FieldSlider
 *   control={form.control}
 *   name="volume"
 *   label="Volume"
 *   min={0}
 *   max={100}
 *   step={5}
 * />
 * ```
 */
function FieldSlider<T extends FieldValues>({
  control,
  name,
  label,
  description,
  min = 0,
  max = 100,
  step = 1,
}: SliderFieldProps<T>) {
  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>
                {label}: {field.value}
              </FieldLabel>
              <Slider
                value={[field.value]}
                onValueChange={(values) => field.onChange(values[0])}
                min={min}
                max={max}
                step={step}
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

export default FieldSlider;
