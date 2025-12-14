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
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import type { FileUploadFieldProps } from "./types";

const ImagePreview = ({
  url,
  onRemove,
  isDeleting = false,
  uploadProgress,
}: {
  url: string;
  onRemove: () => void;
  isDeleting?: boolean;
  uploadProgress?: number;
}) => {
  const isUploading = uploadProgress !== undefined && uploadProgress < 100;

  return (
    <div className="relative aspect-square group">
      <button
        type="button"
        className={cn(
          "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-20 transition-opacity",
          isDeleting ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={onRemove}>
        <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
      </button>
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md z-10">
          <Spinner className="h-6 w-6" />
        </div>
      )}
      <div className="relative h-full w-full">
        <img
          src={url}
          alt="Upload preview"
          className={cn(
            "border border-border h-full w-full rounded-md object-cover",
            (isUploading || isDeleting) && "opacity-50"
          )}
        />
        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 rounded-md">
            <Progress value={uploadProgress} className="w-3/4 mb-2" />
            <span className="text-xs font-medium text-foreground">
              {uploadProgress}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

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
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const simulateUpload = (fileId: string) => {
    setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress((prev) => {
          const newPrev = { ...prev };
          delete newPrev[fileId];
          return newPrev;
        });
      } else {
        setUploadProgress((prev) => ({
          ...prev,
          [fileId]: progress,
        }));
      }
    }, 200);
  };

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

            const fileIds = fileArray.map(
              (file, index) => `${file.name}-${file.size}-${index}`
            );

            const handleDrop = (acceptedFiles: File[]) => {
              if (multiple) {
                const currentFiles = fileArray;
                const newFiles = [
                  ...currentFiles,
                  ...acceptedFiles,
                ].slice(0, maxFiles);
                field.onChange(newFiles);
                const startIndex = currentFiles.length;
                acceptedFiles.forEach((file, i) => {
                  if (startIndex + i < maxFiles) {
                    const fileId = `${file.name}-${file.size}-${startIndex + i}`;
                    simulateUpload(fileId);
                  }
                });
              } else {
                field.onChange(acceptedFiles[0] || null);
                if (acceptedFiles[0]) {
                  const file = acceptedFiles[0];
                  const fileId = `${file.name}-${file.size}-0`;
                  simulateUpload(fileId);
                }
              }
            };

            const handleRemove = async (index: number) => {
              const fileId = fileIds[index];
              setDeletingIds((prev) => new Set(prev).add(fileId));
              await new Promise((resolve) => setTimeout(resolve, 500));
              if (multiple) {
                const newFiles = fileArray.filter((_, i) => i !== index);
                field.onChange(newFiles.length > 0 ? newFiles : null);
              } else {
                field.onChange(null);
              }
              setDeletingIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(fileId);
                return newSet;
              });
            };

            const remainingSlots = maxFiles - fileArray.length;

            return (
              <Field>
                <FieldLabel>{label}</FieldLabel>
                <div
                  className={cn(
                    "grid gap-3",
                    maxFiles === 1 ? "grid-cols-1" : "grid-cols-3"
                  )}>
                  {fileArray.map((file, index) => {
                    const fileId = fileIds[index];
                    return (
                      <ImagePreview
                        key={fileId}
                        url={URL.createObjectURL(file)}
                        onRemove={() => handleRemove(index)}
                        isDeleting={deletingIds.has(fileId)}
                        uploadProgress={uploadProgress[fileId]}
                      />
                    );
                  })}
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

