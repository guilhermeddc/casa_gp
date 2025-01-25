"use client";

import React, { useCallback, Dispatch, SetStateAction, ReactNode } from "react";
import {
  Select as MuiSelect,
  FormHelperText,
  InputLabel,
  FormControl,
  Skeleton,
  Stack,
  CircularProgress,
  SelectProps,
  SelectChangeEvent,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

type MultiSelectProps = SelectProps & {
  name: string;
  control: Control<any>;
  skeletonWidth?: number;
  skeletonHeight?: number;
  isLoading?: boolean;
  isFetching?: boolean;
  helper?: string;
  setAuxValue?(value: Dispatch<SetStateAction<any>>): void;
  label: string;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  control,
  helper,
  onChange,
  children,
  label,
  isLoading,
  isFetching,
  skeletonWidth,
  skeletonHeight = 56,
  ...rest
}) => {
  const {
    field: { onChange: onFieldChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>, child: ReactNode): void => {
      const newValue = event.target.value as string[];
      onFieldChange(newValue);
      onChange?.(event, child);
    },
    [onFieldChange, onChange]
  );

  if (isLoading)
    return (
      <Skeleton
        width={skeletonWidth}
        sx={{ margin: 0 }}
        height={skeletonHeight ?? "100%"}
      />
    );

  return (
    <FormControl variant="outlined" fullWidth error={!!error}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${name}-label`}
        inputRef={ref}
        label={label}
        data-testid={name}
        {...rest}
        value={value || []}
        onChange={handleChange}
        multiple
        endAdornment={
          isFetching ? (
            <Stack>
              <CircularProgress size={24} variant="indeterminate" />
            </Stack>
          ) : null
        }
      >
        {children}
      </MuiSelect>
      {error ? (
        <FormHelperText>{error.message}</FormHelperText>
      ) : (
        helper && <FormHelperText>{helper}</FormHelperText>
      )}
    </FormControl>
  );
};
