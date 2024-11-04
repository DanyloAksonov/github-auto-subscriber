import * as yup from "yup";

export type AutoSubscriberFormFieldsType = {
  token: string;
};

export const autoSubscriberFormSchema: yup.ObjectSchema<AutoSubscriberFormFieldsType> =
  yup.object({
    token: yup.string().required(),
  });
