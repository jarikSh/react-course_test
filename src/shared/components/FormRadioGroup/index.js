import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Controller, useFormContext } from 'react-hook-form';

const FormRadioGroup = (props) => {
  const { name, options, ...restProps } = props;
  const { control } = useFormContext();

  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel
        key={singleOption.value}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup value={value} onChange={onChange} row {...restProps}>
          {generateRadioOptions()}
        </RadioGroup>
      )}
    />
  );
};

FormRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default FormRadioGroup;
