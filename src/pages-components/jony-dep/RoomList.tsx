import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const ListContainer = styled.div`
  margin: 2rem 0;
`;

interface RoomListProps {
  rooms: { name: string }[];
}

const RoomList: React.FC<RoomListProps> = (props) => {
  const { rooms } = props;

  return (
    <ListContainer>
      <h4>Rooms :</h4>
      <ul>
        {Object.entries(rooms).map(([id, { name }]) => (
          <div key={id}>
            <Link to={`/jony-dep?id=${encodeURIComponent(id)}`}>{name}</Link>
          </div>
        ))}
      </ul>
    </ListContainer>
  );
};

export default RoomList;
