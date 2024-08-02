// @ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Questionaire from "../molecules/Questionaire";
import styles from "../../../styles/Home.module.css";
import { Box } from "@mui/material";
import { handleData } from "../../utils/helpers";
import useFeedback from "../../hooks/useFeedbacks";

interface IPersonType {
  leftTypes: {
    id: number;
    description: string;
  }[];

  leftTitle: string;
  generalTypes?: string;
  setFinalResult?: (result: string) => void;
}

const ISScreen = ({
  leftTypes,
  leftTitle,
  generalTypes,
}: IPersonType) => {
  const [leftArr, setLeftArr] = useState({});
  const [leftValues, setLeftValues] = useState({});
  const { feedbackResults, getFeedbackResult } = useFeedback();

  useEffect(() => {
    const leftResult = handleData(leftValues);

    const leftLength = Object.entries(leftValues).map((e, i) => {
      return e[1];
    }).length;

    if (leftLength - 1 === leftTypes.length) {
      if (leftResult?.length) {
        setLeftArr((prev: any) => {
          return {
            ...prev,
            [generalTypes as string]: leftResult,
          };
        });
      }
    }
  }, [
    leftValues,
    generalTypes,
    leftTypes.length,
  ]);

  const handleISResult = useCallback(() => {
    const ITypeResult = leftArr?.[generalTypes]?.length || 0;
    return ITypeResult > 0 ? "I" : undefined;
  }, [leftArr, generalTypes]);

  useEffect(() => {
    const result = handleISResult();
    if (result?.length) {
      getFeedbackResult(result);
    }
  }, [handleISResult]);

  const renderLeftType = useCallback(() => {
    return leftTypes.map((i, key) => {
      return (
        <div key={key}>
          <Questionaire
            description={i.description}
            index={key}
            setValues={setLeftValues}
            generalTypes={generalTypes}
            values={leftValues}
          />
        </div>
      );
    });
  }, [leftTypes, generalTypes, leftValues]);

  return (
    <Box>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>{leftTitle}</h2>
          {renderLeftType()}
        </div>
      </div>
    </Box>
  );
};

export default ISScreen;
