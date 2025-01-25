"use client";

import React, { Dispatch, SetStateAction, useCallback } from "react";
import ClearRounded from "@mui/icons-material/ClearRounded";
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  AutocompleteProps,
  Skeleton,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

interface IProps
  extends Omit<AutocompleteProps<any, any, any, any>, "renderInput"> {
  name: string;
  label: string;
  control: Control<any>;
  maxWidth?: number;
  isLoading?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  setAuxValue?(value: Dispatch<SetStateAction<any>> | null): void;
}

export const Autocomplete: React.FC<IProps> = ({
  name,
  control,
  isLoading,
  skeletonWidth,
  skeletonHeight = 56,
  label,
  maxWidth,
  setAuxValue,
  ...rest
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (_: any, newValue: any) => {
      onChange(newValue);
      setAuxValue?.(newValue);
    },
    [onChange, setAuxValue]
  );

  const handleClear = useCallback(() => {
    onChange(null);
    setAuxValue?.(null);
  }, [onChange, setAuxValue]);

  if (isLoading)
    return <Skeleton height={skeletonHeight} width={skeletonWidth ?? "100%"} />;

  return (
    <MuiAutocomplete
      {...rest}
      sx={{ maxWidth }}
      value={value || null}
      clearText="Limpar"
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Nenhum resultado encontrado"
      onChange={handleChange}
      clearIcon={<ClearRounded onClick={handleClear} fontSize="small" />}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={!!error}
          helperText={error?.message}
          inputRef={ref}
          onBlur={onBlur}
        />
      )}
    />
  );
};
