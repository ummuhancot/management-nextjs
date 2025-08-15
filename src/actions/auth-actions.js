"use server";
import { signIn } from "@/auth";
import { yupErrorToObject } from "@/helpers/form-validation";
import { AuthError } from "next-auth";
import * as Yup from "yup";

const loginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const signInWithCredentialsAction = async (prevState, formData) => {
  const credentials = Object.fromEntries(formData.entries());

  try {
    loginSchema.validateSync(credentials, { abortEarly: false });
    await signIn("credentials", credentials);
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return yupErrorToObject(error.inner);
    } else if (error instanceof AuthError) {
      return {
        ok: false,
        message: error.message,
        errors: null,
      };
    } else {
      throw error;
    }
  }
};

export const signInWithSocialsAction = async (provider) => {
  //Bu yontem kullanilabilir
  //   await signIn(provider, {
  //     redirectTo: "/",
  //   });

  await signIn(provider);
};
