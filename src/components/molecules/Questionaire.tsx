import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

interface IQuestionaire {
  description: string;
  index: number;
  leftLength?: number;
  rightLength?: number;
  setValues?: (val: any) => void;

  generalTypes?: string;
  values?: any;
}

const Questionaire = ({
  description,
  index,
  setValues,
  generalTypes,
  values,
}: IQuestionaire) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (setValues) {
      setValues((prev: any) => {
        return {
          ...prev,
          [index]: key,
          type: generalTypes,
        };
      });
    }
  };

  return (
    <>
      <Typography>
        {index + 1}. {description}
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          value={values?.[index]}
          onChange={handleChange}
        >
          <Box mt={1} mb={1}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </Box>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Questionaire;
