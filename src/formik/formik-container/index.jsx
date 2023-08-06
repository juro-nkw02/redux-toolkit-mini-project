import PropTypes from 'prop-types';
import Input from '../formik-elements/input';
import InputPassword from '../formik-elements/input-password';
import Button from '../formik-elements/button';

const FormikController = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'input-password':
      return <InputPassword {...rest} />;
    case 'button':
      return <Button {...rest} />;
    default:
      return <></>;
  }
};

FormikController.propTypes = {
  props: PropTypes.object,
  control: PropTypes.string,
};

export default FormikController;
