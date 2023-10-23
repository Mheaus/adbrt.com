import * as React from 'react';

// import { palette } from './constants';

// palette['Charleston Green']

interface RoomCreateFormProps {
  onSubmit: (values: { name?: string }) => void; // eslint-disable-line no-unused-vars
}

const RoomCreateForm: React.FC<RoomCreateFormProps> = (props) => {
  const { onSubmit } = props;
  const roomValuesRef = React.useRef({});

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(roomValuesRef.current);
      }}
    >
      <label htmlFor="name" className="flex flex-col my-4">
        Choisir un nom de salle ( optionel )
        <input
          className="w-80 rounded-md"
          id="name"
          name="name"
          onChange={(event) => {
            roomValuesRef.current = { ...roomValuesRef.current, name: event.target.value };
          }}
          type="text"
        />
      </label>
      <button className="bg-white rounded-md text-charleston-green block px-4 py-2" type="submit">
        create new room
      </button>
    </form>
  );
};

export default RoomCreateForm;
