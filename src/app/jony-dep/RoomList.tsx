import * as React from 'react';
import Link from 'next/link';

interface RoomListProps {
  rooms: { name: string }[];
}
const RoomList: React.FC<RoomListProps> = (props) => {
  const { rooms } = props;

  return (
    <div className="my-8">
      <h4>Rooms :</h4>
      <ul>
        {Object.entries(rooms).map(([id, { name }]) => (
          <div key={id}>
            <Link href={`/jony-dep?id=${encodeURIComponent(id)}`}>{name}</Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
