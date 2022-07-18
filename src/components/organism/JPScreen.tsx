// @ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Questionaire from "../molecules/Questionaire";
import styles from "../../../styles/Home.module.css";
import { Box } from "@mui/material";
import { handleData } from "../../utils/helpers";

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
}

const JPScreen = ({
  leftTypes,
  rightTitle,
  rightTypes,
  leftTitle,
  generalTypes,
}: IPersonType) => {
  const [leftArr, setLeftArr] = useState({});
  const [rightArr, setRightArr] = useState({});
  const [leftValues, setLeftValues] = useState({});
  const [rightValues, setRightValues] = useState({});

  useEffect(() => {
    const leftResult = handleData(leftValues);
    const rightResult = handleData(rightValues);

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
  }, [leftValues, generalTypes, rightValues]);

  const handleJPResult = useCallback(() => {
    const JTypeResult = leftArr?.[generalTypes]?.length;
    const PTypeResult = rightArr?.[generalTypes]?.length;
    if (JTypeResult > PTypeResult) {
      return "J";
    } else {
      return "P";
    }
  }, [rightArr, leftArr, generalTypes]);

  useEffect(() => {
    const result = handleJPResult();
  }, [handleJPResult]);

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

export default JPScreen;
