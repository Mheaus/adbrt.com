import * as React from 'react';
import styled from 'styled-components';

import { palette } from './constants';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const Input = styled.input`
  border-radius: 0.25rem;
  border: none;
  width: 20rem;
`;

const ButtonSubmit = styled.button`
  background: #fff;
  border-radius: 0.5rem;
  color: ${palette['Charleston Green']};
  display: block;
  padding: 0.5rem 1rem;
`;

interface RoomCreateFormProps {
  onSubmit: (values: { name?: string }) => void;
}

const RoomCreateForm: React.FC<RoomCreateFormProps> = props => {
  const { onSubmit } = props;
  const roomValuesRef = React.useRef({});

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSubmit(roomValuesRef.current);
      }}
    >
      <Label htmlFor="name">
        Choisir un nom de salle ( optionel )
        <Input
          id="name"
          name="name"
          onChange={event => {
            roomValuesRef.current = { ...roomValuesRef.current, name: event.target.value };
          }}
          type="text"
        />
      </Label>
      <ButtonSubmit type="submit">create new room</ButtonSubmit>
    </form>
  );
};

export default RoomCreateForm;
