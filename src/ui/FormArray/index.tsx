import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formArraySchema, FormArrayValues } from "../../utils";
import { FormHandlers, SharedFormProps } from "../types";
import { FormArrayRenderer } from "./FormArray.Renderer";

const DEFAULT_FORM_THREE_VALUES: FormArrayValues = {
  userData: [],
};

export type FormThreeProps = SharedFormProps<
  FormArrayValues,
  typeof formArraySchema.shape
>;

export const FormThree = forwardRef<FormHandlers, FormThreeProps>(
  (
    {
      defaultFormValues = DEFAULT_FORM_THREE_VALUES,
      validators,
      onSubmit,
      onValidChange,
      onTouchedChange,
      onDirtyChange,
    },
    ref,
  ) => {
    const formMethods = useForm({
      resolver: validators
        ? zodResolver(validators)
        : zodResolver(formArraySchema),
      mode: "onChange",
      defaultValues: defaultFormValues,
    });

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

    return (
      <FormProvider {...formMethods}>
        <FormArrayRenderer />
      </FormProvider>
    );
  },
);
