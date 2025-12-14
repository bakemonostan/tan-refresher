import { zodResolver } from "@hookform/resolvers/zod";
import { FieldInput } from "../form-inputs/FieldInput";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FieldTextarea } from "../form-inputs/FieldTextarea";
import FieldSelect from "../form-inputs/FieldSelect";
import FieldCheckbox from "../form-inputs/FieldCheckbox";
import FieldRadioButton from "../form-inputs/FieldRadioButton";
import FieldSwitch from "../form-inputs/FieldSwitch";
import FieldSlider from "../form-inputs/FieldSlider";
import { FieldNumber } from "../form-inputs/FieldNumber";
import { FieldDatePicker } from "../form-inputs/FieldDatePicker";
import { FieldPinInput } from "../form-inputs/FieldPinInput";
import { FieldDateRangePicker } from "../form-inputs/FieldDateRangePicker";
import { baseFormSchema, type BaseFormSchema } from "./schema/baseFormSchema";

export default function BaseForm() {
  const form = useForm<BaseFormSchema>({
    resolver: zodResolver(baseFormSchema),
  });

  const onSubmit = (data: BaseFormSchema) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      id="form-rhf-demo"
      className="space-y-2"
      onSubmit={form.handleSubmit(onSubmit)}>
      <FieldInput
        control={form.control}
        name="title"
        htmlFor="title"
        inputId="title"
        label="Title"
        type="text"
      />
      <FieldTextarea
        control={form.control}
        name="description"
        htmlFor="description"
        inputId="description"
        label="Description"
      />
      <FieldSelect
        control={form.control}
        name="color"
        items={["Red", "Green", "Blue", "Yellow", "Purple"]}
        label="Colors"
        placeholder="Select colors"
      />
      <FieldCheckbox
        control={form.control}
        name="agree"
        label="Agreement"
        text="I agree to the terms and conditions"
      />
      <FieldRadioButton
        control={form.control}
        name="size"
        items={["Small", "Medium", "Large"]}
        label="Size"
      />
      <FieldSwitch
        control={form.control}
        name="notifications"
        label="Enable notifications"
      />
      <FieldSlider
        control={form.control}
        name="volume"
        label="Volume"
        min={0}
        max={100}
        step={5}
      />
      <FieldNumber
        control={form.control}
        name="age"
        htmlFor="age"
        inputId="age"
        label="Age"
        min={1}
        max={120}
      />
      <FieldDatePicker
        control={form.control}
        name="birthDate"
        label="Date of Birth"
        placeholder="Select your birth date"
      />
      <FieldPinInput
        control={form.control}
        name="pin"
        label="PIN Code"
        maxLength={6}
      />
      <FieldDateRangePicker
        control={form.control}
        name="dateRange"
        label="Date Range"
        placeholder="Select start and end dates"
        numberOfMonths={2}
      />
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
