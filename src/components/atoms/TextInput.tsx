import React, { CSSProperties } from "react";
import {
  Input,
  InputProps,
  FormHelperText,
  FormControl,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import colors from "../../constants/colors";

export interface TextInputProps extends InputProps {
  errMessage?: string;
  label?: string | JSX.Element;
  style?: CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  name?: string;
  className?: string;
  wrapperClassName?: string;
  required?: boolean;
  helperClassName?: string;
  autoComplete?: string;
  type?: string;
  placeText?: string;
}

const DefaultTextInput = styled(Input)`
  border: 1.5px solid ${colors.grey};
  border-radius: 5px;
  padding: 5px 10px;
  width: 50vw;
  margin-bottom: 20px;
`;

const FormHelperTextStyled = styled(FormHelperText)`
  margin-left: 0;
  margin-top: -10px;
  margin-bottom: 5px;
  color: ${colors.alertRed};
`;

const PlaceText = styled(Typography)`
  margin-bottom: 10px;
`;

const TextInput: React.FC<TextInputProps> = ({
  errMessage,
  label,
  style,
  name,
  className,
  wrapperClassName,
  helperClassName,
  required,
  placeText,
  ...registerProps
}) => {
  const renderErrMessage = (
    <FormHelperTextStyled>{errMessage}</FormHelperTextStyled>
  );

  return (
    <FormControl className={wrapperClassName} required={required}>
      <PlaceText>{placeText}</PlaceText>
      <DefaultTextInput
        id={name}
        disableUnderline
        style={style}
        {...registerProps}
      />
      <div>{errMessage && renderErrMessage}</div>
    </FormControl>
  );
};

export default React.memo(TextInput);
