// @ts-nocheck
import styled from "@emotion/styled";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactValues } from "../../services/contact.type";
import FormInputGroup from "./FormInputGroup";
import colors from "../../constants/colors";
import { sendResultToUser, writeDataToSheet } from "../../services/results";
import useFeedback from "../../hooks/useFeedbacks";
import useThankyou from "../../hooks/useThankyou";
import { contactSchema } from "../../services/contactSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const Container = styled(Box)`
  margin-top: 20px;
`;

const fullName = "fullName";
const dob = "dob";
const phoneNumber = "phoneNumber";
const zalo = "zalo";
const email = "email";
const address = "address";
const dream = "dream";

const FinalForm = () => {
  const [validate, setValidate] = useState<any>({});
  const { feedbackResults } = useFeedback();
  const { navigateThankyou } = useThankyou();

  const [isLoading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<ContactValues>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      fullName: undefined,
      dob: undefined,
      phoneNumber: undefined,
      zalo: undefined,
      email: undefined,
      address: undefined,
      dream: undefined,
    },
  });

  const _resetValidation = React.useCallback(
    (key: string) => {
      const _validate = { ...validate, [key]: null };
      setValidate(_validate);
    },
    [validate, setValidate]
  );

  const _validationHandler = React.useCallback(
    (e: any) => {
      setValidate(e);
    },
    [setValidate]
  );

  const onSubmit = React.useCallback(
    async (data: ContactValues) => {
      const fb = feedbackResults.toString().substring(1);
      try {
        setLoading(true);
        await sendResultToUser({
          receiver: data.email,
          email: "ken@techfox.io",
          subject: "KẾT QUẢ TRẮC NGHIỆM TÍNH CÁCH",
          name: "Mạnh Hùng",
          message: `TỔNG KẾT CỦA BẠN: ${fb}`,
        });

        await writeDataToSheet({
          fullName: data.fullName,
          dob: data.dob,
          phoneNumber: data.phoneNumber,
          zalo: data.zalo,
          email: data.email,
          address: data.address,
          dream: data.dream,
          personType: fb,
        });
      } catch (error) {
        console.log("SUBMIT ERR", error);
      } finally {
        setLoading(false);
        navigateThankyou(true);
      }
    },
    [feedbackResults]
  );

  const renderTitle = useCallback(() => {
    return (
      <Box>
        <Typography>
          Text here
        </Typography>
      </Box>
    );
  }, []);

  const renderForm = () => {
    return (
      <Box mt={3} display={"flex"} flexDirection={"column"} width={"100%"}>
        <FormInputGroup
          control={control}
          required
          type={fullName}
          errMessage={validate?.fullName?.message}
          resetValidate={() => _resetValidation(fullName)}
          name={fullName}
          id={fullName}
          placeText={"Full name*"}
          placeholder={"name"}
        />
        <FormInputGroup
          control={control}
          required
          type={"date"}
          errMessage={validate?.dob?.message}
          resetValidate={() => _resetValidation(dob)}
          name={dob}
          id={dob}
          placeText={"dob"}
        />
        <FormInputGroup
          control={control}
          required
          type={phoneNumber}
          errMessage={validate?.phoneNumber?.message}
          resetValidate={() => _resetValidation(phoneNumber)}
          name={phoneNumber}
          id={phoneNumber}
          placeText={"number"}
          placeholder={"number"}
        />
        <FormInputGroup
          control={control}
          required
          type={email}
          errMessage={validate?.email?.message}
          resetValidate={() => _resetValidation(email)}
          name={email}
          id={email}
          placeText={"Email*"}
          placeholder={"email"}
        />
        <FormInputGroup
          control={control}
          required
          type={address}
          name={address}
          id={address}
          resetValidate={() => _resetValidation(address)}
          errMessage={validate?.address?.message}
          placeText={"validate"}
          placeholder={"validate"}
        />
        <Typography color={colors.alertRed}>
          warning
        </Typography>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box mt={2}>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit, _validationHandler)}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Container>
      {renderTitle()}
      {renderForm()}
    </Container>
  );
};

export default FinalForm;
