import Button from "../formik-elements/Button";
import Input from "../formik-elements/Input";
import InputPassword from "../formik-elements/InputPassword";

const FormikController = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "input-password":
      return <InputPassword {...rest} />;
    case "button":
      return <Button {...rest} />;

    default:
      null;
  }
};

export default FormikController;
