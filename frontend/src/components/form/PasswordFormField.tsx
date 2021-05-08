import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { useState } from "react";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
}

export default function FormField({
  name,
  label,
  placeholder,
  type: _,
  ...props
}: FormFieldProps & React.InputHTMLAttributes<HTMLInputElement> & InputProps) {
  const [field, { error }] = useField({ name, ...props });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <FormControl isInvalid={!!error} isRequired>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          {...field}
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          id={name}
          size="lg"
          {...props}
        />
        <InputRightElement width="3rem" mt="1">
          <Button size="sm" tabIndex={-1} onClick={() => setIsPasswordVisible((v) => !v)}>
            {isPasswordVisible ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
