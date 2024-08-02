// @ts-nocheck
import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import styles from "../../../styles/Home.module.css";
import Questionaire from "../molecules/Questionaire";

interface IPersonType {
  leftTypes: {
    id: number;
    description: string;
  }[];

  leftTitle: string;
  generalTypes?: string;
}

const PersonType = ({
  leftTitle,
  leftTypes,
  generalTypes,
}: IPersonType) => {
  const [leftArr, setLeftArr] = useState({});
  const [leftValues, setLeftValues] = useState({});
  const [finalResult, setFinalResult] = useState("");

  const handleValues = useCallback((val: any) => {
    const data = Object.entries(val)
      .map((e, i) => {
        return e[1];
      })
      .reduce((p = [], c) => {
        if (c === "yes") {
          p.push(c);
        }
        return p;
      }, []);
    return data;
  }, []);

  useEffect(() => {
    const data = Object.entries(leftValues)
      .map((e, i) => {
        return e[1];
      })
      .reduce((p = [], c) => {
        if (c === "yes") {
          p.push(c);
        }
        return p;
      }, []);

    if (data.length) {
      setLeftArr((prev: any) => {
        return {
          ...prev,
          [generalTypes]: data,
        };
      });
    }
  }, [leftValues, generalTypes]);

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

export default PersonType;
