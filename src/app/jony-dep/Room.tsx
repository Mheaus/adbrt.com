import * as React from 'react';
// import { useObjectVal } from 'react-firebase-hooks/database';
// import * as firebase from 'gatsby-plugin-firebase';

// import { useLocalStorage } from '../../hooks';

// function createGame({ name = '' }: { name?: string }) {
//   firebase.database().ref(`games`).push({});
// }

interface RoomProps {
  gameId: string;
}

const Room: React.FC<RoomProps> = () => {
  // const { gameId } = props;
  // const [game, isLoading] = useObjectVal<{ name: string }[]>(firebase.database().ref(`game${gameId}`));

  // if (isLoading) {
  //   return <span>chargement en cours...</span>;
  // }

  return <div></div>;
};

export default Room;
