import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import type { PinInputFieldProps } from "./types";

/**
 * Form field component for PIN/OTP inputs
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @param maxLength - Maximum length of PIN (default: 6)
 * @example
 * ```tsx
 * <FieldPinInput
 *   control={form.control}
 *   name="pin"
 *   label="PIN Code"
 *   maxLength={6}
 * />
 * ```
 */
export function FieldPinInput<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  maxLength = 6,
}: PinInputFieldProps<T>) {
  const halfLength = Math.floor(maxLength / 2);

  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>{label}</FieldLabel>
              <InputOTP
                maxLength={maxLength}
                value={field.value}
                onChange={field.onChange}>
                <InputOTPGroup>
                  {Array.from({ length: halfLength }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {Array.from({ length: maxLength - halfLength }).map((_, i) => (
                    <InputOTPSlot key={i + halfLength} index={i + halfLength} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>{description}</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}

