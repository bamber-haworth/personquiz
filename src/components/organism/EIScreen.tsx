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

  rightTypes: {
    id: number;
    description: string;
  }[];

  leftTitle: string;
  rightTitle: string;
  generalTypes?: string;
  setFinalResult?: (result: string) => void;
}

const EIScreen = ({
  leftTypes,
  rightTitle,
  rightTypes,
  leftTitle,
  generalTypes,
  setFinalResult,
}: IPersonType) => {
  const [leftArr, setLeftArr] = useState({});
  const [rightArr, setRightArr] = useState({});
  const [leftValues, setLeftValues] = useState({});
  const [rightValues, setRightValues] = useState({});

  const { getFeedbackResult, feedbackResults } = useFeedback();

  useEffect(() => {
    const leftResult = handleData(leftValues);
    const rightResult = handleData(rightValues);

    const leftLength = Object.entries(leftValues).map((e, i) => {
      return e[1];
    }).length;
    const rightLength = Object.entries(rightValues).map((e, i) => {
      return e[1];
    }).length;

    if (
      leftLength - 1 === leftTypes.length &&
      rightLength - 1 === rightTypes.length
    ) {
      if (leftResult?.length) {
        setLeftArr((prev: any) => {
          return {
            ...prev,
            [generalTypes as string]: leftResult,
          };
        });
      }
      if (rightResult?.length) {
        setRightArr((prev: any) => {
          return {
            ...prev,
            [generalTypes as string]: rightResult,
          };
        });
      }
    }
  }, [
    leftValues,
    generalTypes,
    rightValues,
    leftTypes.length,
    rightTypes.length,
  ]);

  const handleEIResult = useCallback(() => {
    const ETypeResult = leftArr?.[generalTypes]?.length || 0;
    const ITypeResult = rightArr?.[generalTypes]?.length || 0;

    if (ETypeResult > ITypeResult) {
      return "E";
    } else if (ETypeResult < ITypeResult) {
      return "I";
    }
  }, [rightArr, leftArr, generalTypes]);

  useEffect(() => {
    const result = handleEIResult();

    if (result?.length) {
      getFeedbackResult(result);
    }
  }, [handleEIResult]);

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

  const renderRightType = useCallback(() => {
    return rightTypes.map((i, key) => {
      return (
        <div key={key}>
          <Questionaire
            description={i.description}
            index={key}
            setValues={setRightValues}
            generalTypes={generalTypes}
            values={rightValues}
          />
        </div>
      );
    });
  }, [rightTypes, rightValues, generalTypes]);

  return (
    <Box>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>{leftTitle}</h2>
          {renderLeftType()}
        </div>

        <div className={styles.card}>
          <h2>{rightTitle}</h2>
          {renderRightType()}
        </div>
      </div>
    </Box>
  );
};

export default EIScreen;
