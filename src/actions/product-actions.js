"use server";

import { yupErrorToObject } from "@/helpers/form-validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Yup from "yup";

// Urun olusturma icin validation semasi
const productSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .typeError("Price must be a number"),
  category: Yup.string().required("Category is required"),
});

export const createProductAction = async (prevState, formData) => {
  //1 - Datayi almak
  const fields = Object.fromEntries(formData);

  try {
    //2 - Datayi validate etmek
    productSchema.validateSync(fields, { abortEarly: false });

    //3 - Mutation islemi - database'e kaydetme
    const res = await fetch(
      "https://687f739aefe65e520089c219.mockapi.io/products",
      {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        message: "Failed to create product",
        errors: {
          general:
            data.message ||
            "Server occured an unexpected error while product creation.",
        },
      };
    }

    //4 - Cache revalidation
    revalidatePath("/dashboard/products");
    revalidatePath("/products");
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return yupErrorToObject(error.inner);
    }

    return {
      ok: false,
      message: "An unexpected error occurred during validation",
      errors: { general: error.message || "Unknown error" },
    };
  }

  //son olarak olumlu return
  return {
    ok: true,
    message: "Product created successfully",
    errors: null,
  };
};

export const updateProductAction = async (prevState, formData) => {
  const fields = Object.fromEntries(formData.entries());

  try {
    productSchema.validateSync(fields, { abortEarly: false });

    const res = await fetch(
      `https://687f739aefe65e520089c219.mockapi.io/products/${fields.id}`,
      {
        method: "PUT",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        message: "Failed to update product",
        errors: {
          general:
            data.message ||
            "Server occurred an unexpected error while product update.",
        },
      };
    }

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
    //Normalde dinamik render edilen sayfalarda revalidate gerekmez
    revalidatePath(`/dashboard/products/${fields.id}`);
    revalidatePath(`/products/${fields.id}`);
    //guncelleme tamamlaninca urunler sayfasina yonlendir
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return yupErrorToObject(error.inner);
    }
    return {
      ok: false,
      message: "An unexpected error occurred during validation",
      errors: { general: error.message || "Unknown error" },
    };
  }
  //catch'in icinde return oldugu icin, hata olmasi durumunda bu satir calismaz
  redirect("/dashboard/products");
};

export const deleteProductAction = async (productId) => {
  try {
    if (!productId) throw new Error("Product ID is required");

    const res = await fetch(
      `https://687f739aefe65e520089c219.mockapi.io/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        message: "Failed to delete product",
        errors: {
          general:
            data.message ||
            "Server occurred an unexpected error while product deletion.",
        },
      };
    }

    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return {
      ok: true,
      message: "Product deleted successfully",
      errors: null,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message || "An unexpected error occurred",
      errors: { general: error.message || "Unknown error" },
    };
  }
};
