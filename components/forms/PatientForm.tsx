"use client"; // Directiva específica de Next.js 13 que indica que este archivo es un componente del lado del cliente

// Importaciones de librerías y componentes necesarios
import { zodResolver } from "@hookform/resolvers/zod"; // Conecta zod con react-hook-form para la validación de esquemas
import { useForm } from "react-hook-form"; // Hook principal para manejar formularios en React
import { z } from "zod"; // Biblioteca para definir y validar esquemas de datos
import { Button } from "@/components/ui/button"; // Componente de botón de una biblioteca de UI personalizada
import { Form } from "@/components/ui/form"; // Componente de formulario de una biblioteca de UI personalizada
import CustomFormField from "../CustomFormField"; // Componente personalizado para campos de formulario
import SubmitButton from "./../SubmitButton";

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

// Definición del esquema de validación del formulario usando zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

// Definición del componente PatientForm
const PatientForm = () => {
  // 1. Define el formulario usando useForm y el esquema de zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Usa zodResolver para la validación del esquema
    defaultValues: {
      username: "", // Valores por defecto del formulario
    },
  });

  // 2. Define un manejador de envío del formulario
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Haz algo con los valores del formulario
    // ✅ Esto será seguro en cuanto a tipos y validado
    console.log(values); // Muestra los valores en la consola
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

        {/* Se cambia por un boton personalizado */}
        {/* <Button type="submit">Submit</Button> */}
        {/* Botón de envío del formulario */}

        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
};

export default PatientForm; // Exporta PatientForm como el valor por defecto del módulo
