"use client";

import React, { useEffect, useState, useCallback } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";

import {
  TextField as MuiTextField,
  TextFieldProps,
  Skeleton,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

type TVTextFieldProps = Omit<TextFieldProps, "value"> &
  Omit<PatternFormatProps, "format"> & {
    name: string;
    control: Control<any>;
    isLoading?: boolean;
    isFetching?: boolean;
    skeletonWidth?: number;
    skeletonHeight?: number;
    setAuxValue?: (value: any) => void;
  };
export const TextFieldPhone: React.FC<TVTextFieldProps> = ({
  name,
  control,
  isLoading,
  isFetching,
  skeletonWidth,
  skeletonHeight = 56,
  onChange,
  setAuxValue,
  ...rest
}) => {
  const {
    field: { onChange: onFieldChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [mask, setMask] = useState("(##) #####-####");

  const removeSpecialCharacter = useCallback((value: string) => {
    return value
      .replace(/[\s_-]/g, "")
      .replace("-", "")
      .trim();
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = removeSpecialCharacter(event.target.value);
      onFieldChange(inputValue);
      onChange?.(event);
      setAuxValue?.(event.target.value);
    },
    [onFieldChange, onChange, setAuxValue, removeSpecialCharacter]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = removeSpecialCharacter(event.target.value);
      if (inputValue.length <= 10) {
        setMask("(##) ####-####");
      } else {
        setMask("(##) #####-####");
      }
    },
    [removeSpecialCharacter]
  );

  const handleFocus = useCallback(() => {
    setMask("(##) #####-####");
  }, []);

  useEffect(() => {
    // Ajusta a máscara com base no valor inicial
    if (value && removeSpecialCharacter(value).length <= 10) {
      setMask("(##) ####-####");
    } else {
      setMask("(##) #####-####");
    }
  }, [value, removeSpecialCharacter]);

  if (isLoading)
    return <Skeleton height={skeletonHeight} width={skeletonWidth ?? "100%"} />;

  return (
    <PatternFormat
      {...rest}
      format={mask}
      mask="_"
      value={value || ""}
      allowEmptyFormatting
      error={!!error}
      helperText={rest.helperText || error?.message}
      fullWidth
      color="primary"
      variant="outlined"
      placeholder="(00) 00000-0000"
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      customInput={MuiTextField}
      inputRef={ref}
      InputProps={{
        endAdornment: isFetching ? (
          <Stack>
            <CircularProgress size={24} variant="indeterminate" />
          </Stack>
        ) : null,
      }}
    />
  );
};
