import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import styles from "../../styles/Home.module.css";
import PersonType from "../components/organism/PersonType";
import FinalForm from "../components/organism/FinalForm";
import {
  extroverts,
  feelings,
  introverts,
  intuitions,
  judgings,
  perceivings,
  sensings,
  thinkings,
} from "../services/mockData";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepLabel from "@mui/material/StepLabel";
import EIScreen from "../components/organism/EIScreen";
import ISScreen from "../components/organism/ISScreen";
import TFScreen from "../components/organism/TFScreen";
import JPScreen from "../components/organism/JPScreen";
import useThankyou from "../hooks/useThankyou";

const steps = [
  "Bạn là E hay I?",
  "Bạn là N hay S?",
  "Bạn là T hay F?",
  "Bạn là J hay P?",
  "Nhận kết quả",
];

const Home: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [finalResult, setFinalResult] = useState("");

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const renderSteppers = () => {
    return (
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                  <Typography fontWeight={500}>
                    {activeStep === index ? label : null}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    );
  };

  const renderPersonTypes = useCallback(() => {
    switch (activeStep) {
      case 0:
        return (
          <EIScreen
            leftTitle="Extraversion (Hướng ngoại)"
            leftTypes={extroverts}
            rightTitle="Introversion (Hướng nội)"
            rightTypes={introverts}
            generalTypes="EI"
            setFinalResult={setFinalResult}
          />
        );
      case 1:
        return (
          <ISScreen
            leftTitle="Intuition(Trực giác)"
            leftTypes={intuitions}
            rightTitle="Sensing(Cảm nhận)"
            rightTypes={sensings}
            generalTypes="IS"
            setFinalResult={setFinalResult}
          />
        );
      case 2:
        return (
          <TFScreen
            leftTitle="Thinking(Suy nghĩ)"
            leftTypes={thinkings}
            rightTitle="Feeling(Cảm giác)"
            rightTypes={feelings}
            generalTypes="TF"
          />
        );
      case 3:
        return (
          <JPScreen
            leftTitle="Judging(Đánh giá)"
            leftTypes={judgings}
            rightTitle="Perceiving(Nhận thức)"
            rightTypes={perceivings}
            generalTypes="JP"
          />
        );
      case 4:
        return <FinalForm />;
    }
  }, [activeStep]);

  const { isThankyou } = useThankyou();

  const renderThankyouPage = () => {
    return (
      <div className={styles.thankyou}>
        Cảm ơn bạn đã tham gia khảo sát trắc nghiệm tính cách. Vui lòng check
        email để nhận kết quả
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Trắc nghiệm tính cách</title>
        <meta name="description" content="Kiểm tra tính cách chính xác" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Trắc nghiệm tính cách</h1>
        {isThankyou ? (
          renderThankyouPage()
        ) : (
          <div className={styles.main}>
            {renderSteppers()}
            {renderPersonTypes()}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                justifyContent: "space-between",
              }}
              mb={10}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                <Typography>Back</Typography>
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === steps.length - 1 ? null : (
                <Button onClick={handleNext}>
                  <Typography>Next</Typography>
                </Button>
              )}
            </Box>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
