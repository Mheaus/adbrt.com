import * as React from 'react';
import { Link } from 'gatsby';
import { useObjectVal } from 'react-firebase-hooks/database';
import firebase from 'gatsby-plugin-firebase';
import styled, { ThemeProvider } from 'styled-components';

import { useLocalStorage } from '../../hooks';

import { palette } from './constants';
import Room from './Room';
import RoomCreateForm from './RoomCreateForm';
import RoomList from './RoomList';

const firebaseEnabled = typeof window !== 'undefined';

const Layout = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.palette['Green Sheen']};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

function createRoom({ name = '' }: { name?: string }) {
  if (!firebaseEnabled) return null;

  return firebase
    .database()
    .ref(`rooms`)
    .push({ name });
}

async function joinRoom(roomId: string, userName: string) {
  if (firebaseEnabled) {
    const room = firebase.database().ref(`rooms/${roomId}`);

    const snapshot = await room.child('users').once('value');

    if (!Object.values(snapshot.val()).includes(userName)) {
      room.child('users').push(userName);
    }
  }
}

interface JonyDepProps {
  location: Location;
  navigate: (to: string) => void;
  uri: string;
}

const JonyDep: React.FC<JonyDepProps> = props => {
  const { location, navigate, uri } = props;
  const [rooms, isLoading] = useObjectVal<{ name: string }[]>(firebaseEnabled && firebase.database().ref('rooms'));
  const [session, setSession] = useLocalStorage<string>('session', null);
  const [userName, setUserName] = useLocalStorage<string>('userName', null);
  const userNameRef = React.useRef('');

  console.log(props);
  console.log(rooms);

  const roomToJoin = React.useMemo(() => {
    const id = location.search && new URLSearchParams(decodeURIComponent(location.search)).get('id');

    return id && rooms && Object.entries(rooms).find(([roomId]) => roomId === id);
  }, [location, rooms]);

  if (isLoading) {
    return <span>chargement en cours...</span>;
  }

  return (
    <ThemeProvider theme={{ palette }}>
      <Layout>
        <h1>Johnny Depp !</h1>

        {session && userName && roomToJoin && <Room id={roomToJoin[0]} {...roomToJoin[1]} />}
        {session && !userName && (
          <div>
            <h3>Choisis ton nom :</h3>
            <input
              name="username"
              onChange={event => {
                userNameRef.current = event.currentTarget.value;
              }}
            />
            <button
              onClick={() => {
                setUserName(userNameRef.current);
                joinRoom(roomToJoin[0], userNameRef.current);
              }}
              type="button"
            >
              valider
            </button>
          </div>
        )}
        {!session && roomToJoin && (
          <div>
            <h3>
              Souhaitez-vous rejoindre la partie <b>{roomToJoin[1].name}</b> ?
            </h3>
            <div>
              <button onClick={() => setSession(roomToJoin[0])} type="button">
                oui
              </button>
              <Link to={uri}>non</Link>
            </div>
          </div>
        )}
        {!roomToJoin && (
          <>
            <RoomCreateForm
              onSubmit={async values => {
                const room = await createRoom(values);

                navigate(`${uri}?id=${room.key}`);
              }}
            />
            <RoomList rooms={rooms} />
          </>
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default JonyDep;
