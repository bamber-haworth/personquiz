import { Box } from "@mui/material";
import React, { useCallback } from "react";

import styles from "../../../styles/Home.module.css";
import Questionaire from "../molecules/Questionaire";

interface IPersonType {
  leftTypes: {
    id: number;
    description: string;
  }[];

  rightTypes: {
    id: number;
    description: string;
  }[];

  leftTitle: string;
  rightTitle: string;
}

const PersonType = ({
  leftTitle,
  rightTitle,
  leftTypes,
  rightTypes,
}: IPersonType) => {
  const renderExType = useCallback(() => {
    return leftTypes.map((i, key) => {
      return (
        <div>
          <Questionaire description={i.description} index={key} />
        </div>
      );
    });
  }, [leftTypes]);

  const renderInType = useCallback(() => {
    return rightTypes.map((i, key) => {
      return (
        <div>
          <Questionaire description={i.description} index={key} />
        </div>
      );
    });
  }, [rightTypes]);

  return (
    <Box>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>{leftTitle}</h2>
          {renderExType()}
        </div>

        <div className={styles.card}>
          <h2>{rightTitle}</h2>
          {renderInType()}
        </div>
      </div>
    </Box>
  );
};

export default PersonType;
