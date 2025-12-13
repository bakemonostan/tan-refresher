import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldInput } from "../form-inputs/FieldInput";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export default function BaseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
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
      <FieldInput
        control={form.control}
        name="description"
        htmlFor="description"
        inputId="description"
        label="Description"
        type="text"
      />
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
