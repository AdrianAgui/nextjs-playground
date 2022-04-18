const pokeTypes = [
  {
    key: 'fire',
    value: 'fire',
    image: { avatar: true, src: '/poketypes/fire.png' }
  },
  {
    key: 'water',
    value: 'water',
    image: { avatar: true, src: '/poketypes/water.png' }
  },
  {
    key: 'grass',
    value: 'grass',
    image: { avatar: true, src: '/poketypes/grass.png' }
  }
];

export default function TypeSelector() {
  const handleChange = ({ value }) => console.log(value);

  return <div className='ml-5'></div>;
}
