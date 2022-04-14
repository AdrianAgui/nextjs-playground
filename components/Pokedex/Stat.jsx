import css from 'styles/Pokedex.module.css';

export default function Stat({ item }) {
  return (
    <li className={css['pokemon-stat']}>
      <span className={css['stat-name']}>
        <b>{item.stat.name}: </b>
      </span>
      <span>{item.base_stat}</span>
    </li>
  );
}
