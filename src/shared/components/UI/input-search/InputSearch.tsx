import React from 'react';

import {Search} from '@mui/icons-material';
import {
  IconButton,
  InputBase,
  Stack,
  InputBaseProps,
  CircularProgress,
} from '@mui/material';

interface InputSearchProps extends InputBaseProps {
  placeholder?: string;
  onClick?: () => void;
  width?: string | number;
  isLoading?: boolean;
}

export const InputSearch: React.FC<InputSearchProps> = ({
  placeholder = 'Pesquisar...',
  onClick,
  width = '100%',
  isLoading = false,
  ...props
}) => {
  return (
    <Stack
      width={width}
      direction="row"
      paddingY={0.5}
      paddingX={0.75}
      borderRadius={1}
      bgcolor="background.paper"
      boxShadow="0px 2px 3px 0px #00000061">
      <Stack
        marginLeft={0.5}
        marginRight={1}
        direction="row"
        alignItems="center">
        <IconButton
          color="default"
          onClick={onClick}
          sx={
            !onClick
              ? {
                  cursor: 'default',
                  pointerEvents: 'none',
                }
              : {}
          }>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Search color="disabled" />
          )}
        </IconButton>
      </Stack>
      <InputBase {...props} fullWidth placeholder={placeholder} />
    </Stack>
  );
};
