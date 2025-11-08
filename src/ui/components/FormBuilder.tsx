import { forwardRef, ReactNode, useEffect, useImperativeHandle } from "react";
import { type FieldValues, FormProvider, useForm } from "react-hook-form";
import type { UseFormProps } from "react-hook-form/";
import { $ZodType, $ZodTypeInternals } from "zod/v4/core";
import { FormHandlers, SharedFormProps } from "../types";

export const FormBuilder = <
  FormValues extends FieldValues,
  FormValidatorsType extends Readonly<{
    [k: string]: $ZodType<
      unknown,
      unknown,
      $ZodTypeInternals<unknown, unknown>
    >;
  }>,
>() =>
  forwardRef<
    FormHandlers,
    SharedFormProps<FormValues, FormValidatorsType> & {
      children: ReactNode;
      props: UseFormProps;
    }
  >(
    (
      {
        onSubmit,
        onValidChange,
        onTouchedChange,
        onDirtyChange,
        children,
        props,
      },
      ref,
    ) => {
      const formMethods = useForm(props);

      const {
        handleSubmit,
        reset,
        formState: { isValid, isDirty, touchedFields },
      } = formMethods;

      useImperativeHandle(
        ref,
        () => ({
          submit: handleSubmit(onSubmit),
          reset,
        }),
        [onSubmit],
      );

      useEffect(() => {
        onValidChange?.(isValid);
      }, [isValid]);

      useEffect(() => {
        onDirtyChange?.(isDirty);
      }, [isDirty]);

      useEffect(() => {
        onTouchedChange?.(touchedFields);
      }, [touchedFields]);

      return <FormProvider {...formMethods}>{children}</FormProvider>;
    },
  );
