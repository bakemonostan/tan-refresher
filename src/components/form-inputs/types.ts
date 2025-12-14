import type { Control, FieldValues, Path } from "react-hook-form";

/**
 * Base props shared across all form field components
 */
export interface BaseFieldProps<T extends FieldValues> {
  /** Field name from form schema */
  name: Path<T>;
  /** React Hook Form control object */
  control: Control<T>;
  /** Field label text */
  label: string;
  /** Optional field description */
  description?: string;
}

/**
 * Props for input and textarea fields
 */
export interface TextFieldProps<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  /** HTML for attribute */
  htmlFor: string;
  /** Input element ID */
  inputId: string;
  /** Placeholder text */
  placeholder?: string;
}

/**
 * Props for select field
 */
export interface SelectFieldProps<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  /** Array of select options */
  items: string[];
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Props for checkbox field
 */
export interface CheckboxFieldProps<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  /** Checkbox text label */
  text?: string;
}

/**
 * Props for radio group field
 */
export interface RadioGroupFieldProps<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  /** Array of radio options */
  items: string[];
}

/**
 * Props for slider field
 */
export interface SliderFieldProps<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
}

/**
 * Props for number input field
 */
export interface NumberFieldProps<
  T extends FieldValues,
> extends TextFieldProps<T> {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
}

/**
 * Props for date picker field
 */
export interface DatePickerFieldProps<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  /** Placeholder text */
  placeholder?: string;
}

/**
 * Props for PIN input field
 */
export interface PinInputFieldProps<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  /** Maximum length of PIN */
  maxLength?: number;
}

/**
 * Props for date range picker field
 */
export interface DateRangePickerFieldProps<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  /** Placeholder text */
  placeholder?: string;
  /** Number of months to display */
  numberOfMonths?: number;
}
