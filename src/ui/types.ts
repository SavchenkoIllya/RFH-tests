import type { FieldNamesMarkedBoolean, FieldValues } from "react-hook-form";
import { z } from "zod";
import { $ZodType, $ZodTypeInternals } from "zod/v4/core";

export type FormHandlers = {
  submit: () => void;
  reset: () => void;
};

export type SharedFormProps<
  FormValues extends FieldValues,
  FormValidatorsType extends Readonly<{
    [k: string]: $ZodType<
      unknown,
      unknown,
      $ZodTypeInternals<unknown, unknown>
    >;
  }>,
> = {
  onSubmit: (values: FormValues) => void;

  defaultFormValues?: FormValues;
  onValidChange?: (isValid: boolean) => void;
  onTouchedChange?: (
    touchedFields: Partial<FieldNamesMarkedBoolean<FormValues>>,
  ) => void;
  onDirtyChange?: (isDirty: boolean) => void;

  // Валидация может меняться, но ключи/типы полей — как у formOneSchema
  validators?: z.ZodObject<FormValidatorsType>;
};
