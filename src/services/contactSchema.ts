import * as yup from "yup";

const requiredMess = 'Trường bắt buộc phải nhập'

export const contactSchema = yup.object().shape({
  email: yup
    .string()
    .email("Sai định dạng email")
    .required(requiredMess),
  fullName: yup.string().required(requiredMess),
  dob: yup.string().required(requiredMess),
  phoneNumber: yup.string().required(requiredMess),
  address: yup.string().required(requiredMess)

});
