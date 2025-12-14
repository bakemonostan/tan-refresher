import { Controller, type FieldValues } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Dropzone from "react-dropzone";
import type { FileUploadFieldProps } from "./types";

/**
 * Image preview component with remove button
 */
const ImagePreview = ({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) => (
  <div className="relative aspect-square">
    <button
      type="button"
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10"
      onClick={onRemove}>
      <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
    </button>
    <img
      src={url}
      alt="Upload preview"
      className="border border-border h-full w-full rounded-md object-cover"
    />
  </div>
);

/**
 * Form field component for file uploads with drag and drop
 * @param control - React Hook Form control object
 * @param name - Field name from form schema
 * @param label - Field label text
 * @param description - Optional field description
 * @param accept - Accepted file types (default: images)
 * @param maxFiles - Maximum number of files (default: 1)
 * @param multiple - Allow multiple files
 * @example
 * ```tsx
 * // Single file upload
 * <FieldFileUpload
 *   control={form.control}
 *   name="profilePicture"
 *   label="Profile Picture"
 *   maxFiles={1}
 * />
 * 
 * // Multiple file upload
 * <FieldFileUpload
 *   control={form.control}
 *   name="gallery"
 *   label="Gallery Images"
 *   maxFiles={3}
 *   multiple
 * />
 * ```
 */
export function FieldFileUpload<T extends FieldValues>({
  control,
  name,
  label = "Label",
  description,
  accept = {
    "image/png": [".png", ".jpg", ".jpeg", ".webp"],
  },
  maxFiles = 1,
  multiple = false,
}: FileUploadFieldProps<T>) {
  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => {
            const files = field.value as File[] | File | null;
            const fileArray = files
              ? Array.isArray(files)
                ? files
                : [files]
              : [];

            const handleDrop = (acceptedFiles: File[]) => {
              if (multiple) {
                const currentFiles = fileArray;
                const newFiles = [
                  ...currentFiles,
                  ...acceptedFiles,
                ].slice(0, maxFiles);
                field.onChange(newFiles);
              } else {
                field.onChange(acceptedFiles[0] || null);
              }
            };

            const handleRemove = (index: number) => {
              if (multiple) {
                const newFiles = fileArray.filter((_, i) => i !== index);
                field.onChange(newFiles.length > 0 ? newFiles : null);
              } else {
                field.onChange(null);
              }
            };

            const remainingSlots = maxFiles - fileArray.length;

            return (
              <Field>
                <FieldLabel>{label}</FieldLabel>
                <div className={cn(
                  "grid gap-3",
                  maxFiles === 1 ? "grid-cols-1" : "grid-cols-3"
                )}>
                  {fileArray.map((file, index) => (
                    <ImagePreview
                      key={index}
                      url={URL.createObjectURL(file)}
                      onRemove={() => handleRemove(index)}
                    />
                  ))}
                  {remainingSlots > 0 &&
                    Array.from({ length: remainingSlots }).map((_, index) => (
                      <Dropzone
                        key={`dropzone-${index}`}
                        onDrop={handleDrop}
                        accept={accept}
                        maxFiles={multiple ? remainingSlots : 1}>
                        {({
                          getRootProps,
                          getInputProps,
                          isDragActive,
                          isDragAccept,
                          isDragReject,
                        }) => (
                          <div
                            {...getRootProps()}
                            className={cn(
                              "border border-dashed flex items-center justify-center aspect-square rounded-md focus:outline-hidden focus:border-primary cursor-pointer transition-colors",
                              {
                                "border-primary bg-secondary":
                                  isDragActive && isDragAccept,
                                "border-destructive bg-destructive/20":
                                  isDragActive && isDragReject,
                              }
                            )}>
                            <input {...getInputProps()} />
                            <ImageIcon className="h-16 w-16" strokeWidth={1.25} />
                          </div>
                        )}
                      </Dropzone>
                    ))}
                </div>
                <FieldDescription>{description}</FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
    </FieldSet>
  );
}

