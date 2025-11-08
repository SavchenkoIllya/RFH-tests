import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formOneSchema, FormOneValues, SharedValues } from "../../utils";
import { FormHandlers, SharedFormProps } from "../types";
import { FormOneContent } from "./FormOne.content";

export const SHARED_DEFAULTS: SharedValues = {
  firstName: "",
  lastName: "",
};

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
      [],
    );

    useEffect(() => {
      onValidChange?.(isValid);
    }, [isValid]);

    useEffect(() => {
      onValidChange?.(isValid);
    }, [isValid]);

    useEffect(() => {
      onDirtyChange?.(isDirty);
    }, [isDirty]);

    return (
      // Все поля обязательно должны быть врапнуты в провайдер, чтобы инпуты могли внутри себя юзать свои хуки
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(console.log)}>
          <FormOneContent />
        </form>
      </FormProvider>
    );
  },
);
