import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
}

export default function FormField({
  name,
  label,
  placeholder,
  ...props
}: FormFieldProps & React.InputHTMLAttributes<HTMLInputElement> & InputProps) {
  const [field, { error }] = useField({ name, ...props });
  
  return (
    <FormControl isInvalid={!!error} isRequired>
      <FormLabel>{label}</FormLabel>
      <Input
        {...field}
        type="text"
        placeholder={placeholder}
        id={name}
        size="lg"
        {...props}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
