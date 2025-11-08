import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formTwoSchema, FormTwoValues } from "../../utils";
import { SHARED_DEFAULTS } from "../FormOne";
import { FormTextInput, ReusableNamesFieldsGroups } from "../components";
import { FormHandlers, SharedFormProps } from "../types";

const DEFAULT_FORM_TWO_VALUES: FormTwoValues = {
  userData: SHARED_DEFAULTS,
  amountOfUsers: 1,
};

export type FormTwoProps = SharedFormProps<
  FormTwoValues,
  typeof formTwoSchema.shape
>;

export const FormTwo = forwardRef<FormHandlers, FormTwoProps>(
  (
    {
      defaultFormValues = DEFAULT_FORM_TWO_VALUES,
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
        : zodResolver(formTwoSchema),
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
        <Stack spacing={2}>
          <ReusableNamesFieldsGroups prefix={"userData"} />
          <FormTextInput
            name={"amountOfUsers"}
            fieldProps={{
              label: "Ammount of users | Just dont touch",
              type: "number",
            }}
          />
        </Stack>
      </FormProvider>
    );
  },
);
