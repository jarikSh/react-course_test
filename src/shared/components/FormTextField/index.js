import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

const FormTextField = (props) => {
  const { name, label, ...restProps } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          onChange={onChange}
          value={value}
          label={label}
          variant="outlined"
          error={!!error}
          helperText={error?.message}
          {...restProps}
        />
      )}
    />
  );
};

FormTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default FormTextField;
