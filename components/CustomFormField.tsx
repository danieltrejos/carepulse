"use client"; // Directiva específica de Next.js 13 que indica que este archivo es un componente del lado del cliente
import parsePhoneNumber, { E164Number } from "libphonenumber-js";
// Importaciones de componentes de la biblioteca de UI personalizada
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Importación de `Control` de `react-hook-form` para manejar la lógica del formulario
import { Control } from "react-hook-form";

// Importación de `FormFieldType` para definir los tipos de campos del formulario
import { FormFieldType } from "./forms/PatientForm";

// Importación del componente de imagen optimizado de Next.js
import Image from "next/image";
// Importacion del componente de PhoneInput
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

// Definición de la interfaz `CustomProps` que describe las propiedades que el componente `CustomFormField` espera recibir
interface CustomProps {
  control: Control<any>; // Control de `react-hook-form`
  fieldType: FormFieldType; // Tipo de campo del formulario
  name: string; // Nombre del campo
  label?: string; // Etiqueta del campo
  placeholder?: string; // Texto de marcador de posición del campo
  iconSrc?: string; // Fuente del ícono del campo
  iconAlt?: string; // Texto alternativo del ícono
  disabled?: boolean; // Indica si el campo está deshabilitado
  dateFormat?: string; // Formato de fecha (si aplica)
  showTimeSelect?: boolean; // Indica si se debe mostrar un selector de tiempo (si aplica)
  children?: React.ReactNode; // Elementos secundarios
  renderSkeleton?: (field: any) => React.ReactNode; // Función para renderizar un esqueleto de carga
}

/* 
Qué Hace field
field es un objeto proporcionado por react-hook-form que contiene varias propiedades y métodos que permiten controlar y vincular el campo del formulario con el estado y la lógica de validación del formulario. Algunas de las propiedades típicas incluidas en field son:

name: El nombre del campo del formulario.
value: El valor actual del campo.
onChange: Un evento manejador que se invoca cuando el valor del campo cambia.
onBlur: Un evento manejador que se invoca cuando el campo pierde el foco.
ref: Una referencia al elemento del DOM del campo, utilizada para gestionar el enfoque y otras operaciones del DOM.

Si se desea obtener el valor del campo en lugar de usar `field.value`, también se puede utilizar `field.onChange(event.target.value)`.
*/

// Función `RenderField` que renderiza diferentes tipos de campos basados en `fieldType`
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconAlt, iconSrc, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <Input
            {...field} // Pasa todas las propiedades de `field` al componente `Input`
            placeholder={placeholder}
            disabled={props.disabled}
            className="shad-input border-0"
          />
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="CO"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={(field.value as E164Number) || undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    default:
      break;
  }
};

// Componente `CustomFormField` que utiliza `FormField` de `react-hook-form`
const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } =
    props;
  // Retorno del componente
  return (
    <FormField
      control={control} // Pasa el control de `react-hook-form`
      name={name} // Nombre del campo
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel> // Renderiza la etiqueta del campo si no es un checkbox
          )}
          {/* Renderiza el campo utilizando `RenderField` */}
          <RenderField field={field} props={props} />
          {/* Muestra mensajes de error */}
          <FormMessage className="shad-error"></FormMessage>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField; // Exporta `CustomFormField` como el valor por defecto del módulo
