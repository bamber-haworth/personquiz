import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

interface IQuestionaire {
  description: string;
  index: number;
}

const Questionaire = ({ description, index }: IQuestionaire) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
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
          value={value}
          onChange={handleChange}
        >
          <Box mt={1} mb={1}>
            <FormControlLabel value="yes" control={<Radio />} label="Đúng" />
            <FormControlLabel value="no" control={<Radio />} label="Sai" />
          </Box>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Questionaire;
