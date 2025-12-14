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
import type { DateRange } from "react-day-picker";
import type { DateRangePickerFieldProps } from "./types";

/**
 * Form field component for date range picker
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @param placeholder - Placeholder text
 * @param numberOfMonths - Number of months to display (default: 2)
 * @example
 * ```tsx
 * <FieldDateRangePicker
 *   control={form.control}
 *   name="dateRange"
 *   label="Select Date Range"
 *   placeholder="Pick a date range"
 *   numberOfMonths={2}
 * />
 * ```
 */
export function FieldDateRangePicker<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  placeholder = "Select date range",
  numberOfMonths = 2,
}: DateRangePickerFieldProps<T>) {
  const [open, setOpen] = useState(false);

  const formatDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from) return placeholder;
    
    const fromDate = new Date(dateRange.from).toLocaleDateString();
    if (!dateRange.to) return fromDate;
    
    const toDate = new Date(dateRange.to).toLocaleDateString();
    return `${fromDate} - ${toDate}`;
  };

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
                    <span className={field.value?.from ? "" : "text-muted-foreground"}>
                      {formatDateRange(field.value)}
                    </span>
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={(range) => {
                      const hadFrom = field.value?.from;
                      const nowHasTo = range?.to;
                      
                      field.onChange(range);
                      
                      // Close only when we just selected the end date
                      if (hadFrom && nowHasTo) {
                        setTimeout(() => setOpen(false), 100);
                      }
                    }}
                    numberOfMonths={numberOfMonths}
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

