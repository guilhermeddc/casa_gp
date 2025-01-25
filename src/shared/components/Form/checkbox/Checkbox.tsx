"use client";

import React, { JSXElementConstructor, ReactElement, useCallback } from "react";
import {
  Checkbox as MuiCheckbox,
  CheckboxProps,
  useTheme,
  Skeleton,
  FormControlLabel,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

type TVCheckboxProps = CheckboxProps & {
  name: string;
  control: Control<any>;
  isLoading?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  returnValue?(value: boolean): void;
  label:
    | string
    | number
    | ReactElement<any, string | JSXElementConstructor<any>>;
};

export const Checkbox: React.FC<TVCheckboxProps> = ({
  name,
  control,
  isLoading,
  skeletonWidth = 20,
  skeletonHeight = 20,
  returnValue,
  label,
  ...props
}) => {
  const theme = useTheme();

  const {
    field: { onChange, value, ref },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      onChange(checked);
      returnValue?.(checked);
    },
    [onChange, returnValue]
  );

  if (isLoading)
    return (
      <Skeleton
        variant="circular"
        width={skeletonWidth}
        height={skeletonHeight}
        style={{ margin: theme.spacing(2) }}
      />
    );

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          inputRef={ref}
          checked={props.checked ?? !!value}
          onChange={handleChange}
          {...props}
        />
      }
      label={label}
    />
  );
};
