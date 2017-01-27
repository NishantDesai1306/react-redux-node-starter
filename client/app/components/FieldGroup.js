import React, {PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

FieldGroup.propTypes = {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string
};

export default FieldGroup;