import { useState, useEffect, memo } from 'react';
import css from 'styles/MyTeam.module.scss';

import Slot from './Slot';
import { useGlobalContext } from 'core/context/GlobalContext';
import { onAuthStateChanges } from 'core/firebase/auth';
import { getTeam } from 'core/firebase/teams';
import { TEAM_LIMIT } from 'core/utils/constants';

function MyTeam() {
  const { user, setMyTeam } = useGlobalContext();

  const [team, setTeam] = useState([]);

  useEffect(() => {
    onAuthStateChanges().then((user) => {
      if (user) {
        getTeam(user?.uid).then((team) => {
          const emptySlots = TEAM_LIMIT - team.length;
          const emptySlotsArray = Array.from({ length: emptySlots }, (_, i) => i);
          setTeam(team.concat(emptySlotsArray));
          setMyTeam(team);
        });
      } else {
        setTeam([]);
        setMyTeam([]);
      }
    });
  }, [user]);

  return (
    <>
      {user ? (
        <div className={css.myTeamContainer}>
          {team.map((pokemon, index) => (
            <Slot key={index} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className='flex justify-center font-semibold'>To build your Pokemon team, you have to Login</div>
      )}
    </>
  );
}

export default memo(MyTeam);
