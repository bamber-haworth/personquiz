import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../../styles/Home.module.css";
import { ContactValues } from "../../services/contact.type";
import FormInputGroup from "./FormInputGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import colors from "../../constants/colors";

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
  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<ContactValues>({
    // resolver: yupResolver(authSchema),
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

  const onSubmit = React.useCallback(async (data: ContactValues) => {
    console.log("NICE", data);
  }, []);

  const renderTitle = useCallback(() => {
    return (
      <Box>
        <Typography>
          Các bạn vui lòng điền thông tin và gửi đi. Hệ thống sẽ gửi lại kết quả
          tới email của các bạn. <br /> Xin chân thành cảm ơn!
        </Typography>
      </Box>
    );
  }, []);

  const renderForm = useCallback(() => {
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
          placeText={"Họ và tên*"}
          placeholder={"Điền câu trả lời"}
        />
        <FormInputGroup
          control={control}
          required
          type={"date"}
          errMessage={validate?.dob?.message}
          resetValidate={() => _resetValidation(dob)}
          name={dob}
          id={dob}
          placeText={"Ngày, tháng, năm, sinh*"}
        />
        <FormInputGroup
          control={control}
          required
          type={phoneNumber}
          errMessage={validate?.phoneNumber?.message}
          resetValidate={() => _resetValidation(phoneNumber)}
          name={phoneNumber}
          id={phoneNumber}
          placeText={"Số điện thoại*"}
          placeholder={"Điền câu trả lời"}
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
          placeholder={"Điền câu trả lời"}
        />
        <FormInputGroup
          control={control}
          type={zalo}
          errMessage={validate?.zalo?.message}
          resetValidate={() => _resetValidation(zalo)}
          name={zalo}
          id={zalo}
          placeText={"Zalo"}
          placeholder={"Điền câu trả lời"}
        />
        <FormInputGroup
          control={control}
          required
          type={address}
          name={address}
          id={address}
          placeText={"Địa chỉ*"}
          placeholder={"Điền câu trả lời"}
        />
        <FormInputGroup
          control={control}
          type={dream}
          name={dream}
          id={dream}
          placeText={"Nguyện vọng Trường và Ngành ở Việt Nam?"}
          placeholder={"Điền câu trả lời"}
        />
        <Typography color={colors.alertRed}>
          Lưu ý: các ô đánh dấu * là bắt buộc phải điền
        </Typography>

        <Box mt={2}>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit, _validationHandler)}
          >
            Nhận kết quả
          </Button>
        </Box>
      </Box>
    );
  }, []);

  return (
    <Container>
      {renderTitle()}
      {renderForm()}
    </Container>
  );
};

export default FinalForm;
