"use client"; // Directiva específica de Next.js 13 que indica que este archivo es un componente del lado del cliente

// Importaciones de librerías y componentes necesarios
import { zodResolver } from "@hookform/resolvers/zod"; // Conecta zod con react-hook-form para la validación de esquemas
import { z } from "zod"; // Biblioteca para definir y validar esquemas de datos

import { Form } from "@/components/ui/form"; // Componente de formulario de una biblioteca de UI personalizada
import CustomFormField from "../CustomFormField"; // Componente personalizado para campos de formulario
import SubmitButton from "./../SubmitButton";

import { useForm } from "react-hook-form"; // Hook principal para manejar formularios en React
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

import { createUser } from "@/lib/actions/patient.actions";

// Definición de tipos de campos del formulario
export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

// --------------------------------------Componente
// Definición del componente PatientForm
const PatientForm = () => {
  //Pasar el usuario por la ruta
  const router = useRouter();

  //Defiicion del hook de la variable isLoading
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define el formulario usando useForm y el esquema de zod
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation), // Usa zodResolver para la validación del esquema
    defaultValues: {
      name: "", // Valores por defecto del formulario
      email: "", // Valores por defecto del formulario
      phone: "", // Valores por defecto del formulario
    },
  });

  // 2. Define un manejador de envío del formulario
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      //DATOS DE USUARIO
      const userData = { name, email, phone };
      //CREACION DEL USUARIO
      console.log("userData:", { userData });
      const user = await createUser(userData);
      console.log("user:", user);

      if (user) {
        router.push(`/patient/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
    console.log({ name, email, phone }); // Muestra los valores en la consola
  }

  // Retorna la UI del formulario
  return (
    <Form {...form}>
      {" "}
      {/* Componente de formulario que envuelve el formulario principal */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {/* Sección superior de descripción */}
        <section className="mb-12 space-x-4">
          <h1>Hi there✌️</h1> {/* Título del formulario */}
          <p className="text-dark-700">Schedule your first appointment.</p>{" "}
          {/* Descripción del formulario */}
        </section>
        {/* Campos personalizados */}
        {/* Campo de nombre de usuario */}
        <CustomFormField
          control={form.control} // Control de react-hook-form
          fieldType={FormFieldType.INPUT} // Tipo de campo (input)
          name="name" // Nombre del campo
          label="Full name" // Etiqueta del campo
          placeholder="John Doe" // Marcador de posición del campo
          iconSrc="/assets/icons/user.svg" // Fuente del ícono
          iconAlt="user" // Texto alternativo del ícono
        />
        {/* Campo de correo electrónico */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        {/* Campo de número de teléfono */}
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="3001234567"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm; // Exporta PatientForm como el valor por defecto del módulo
