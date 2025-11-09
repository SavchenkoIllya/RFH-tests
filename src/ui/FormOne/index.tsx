import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formOneSchema, FormOneValues } from "../../utils";
import { SHARED_DEFAULTS } from "../components";
import { FormHandlers, SharedFormProps } from "../types";
import { FormOneContent } from "./FormOne.content";

const DEFAULT_FORM_ONE_VALUES: FormOneValues = {
  ...SHARED_DEFAULTS,
  email: "",
};

export type FormOneProps = SharedFormProps<
  FormOneValues,
  typeof formOneSchema.shape
>;

export const FormOne = forwardRef<FormHandlers, FormOneProps>(
  (
    {
      defaultFormValues = DEFAULT_FORM_ONE_VALUES,
      validators,
      onSubmit,
      onValidChange,
      onDirtyChange,
      onTouchedChange,
    },
    ref,
  ) => {
    const formMethods = useForm({
      resolver: validators
        ? zodResolver(validators)
        : zodResolver(formOneSchema),
      mode: "onChange",
      defaultValues: defaultFormValues,
    });

    // Поднимаем по необходимости через forwardRef и useImperativeHandle
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
    }, [JSON.stringify(touchedFields)]);

    return (
      // Все поля обязательно должны быть врапнуты в провайдер, чтобы инпуты могли внутри себя юзать свои хуки
      <FormProvider {...formMethods}>
        <FormOneContent />
      </FormProvider>
    );
  },
);
