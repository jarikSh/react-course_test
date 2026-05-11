import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller, useFormContext } from 'react-hook-form';

const FormCheckbox = (props) => {
  const { name, label, ...restProps } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControlLabel
          control={<Checkbox style={{ color: error ? 'red' : undefined }} />}
          onChange={onChange}
          value={value}
          label={label}
          {...restProps}
        />
      )}
    />
  );
};

FormCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired
};

export default FormCheckbox;
