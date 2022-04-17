import { Dropdown } from 'semantic-ui-react';

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

  return (
    <div className='ml-5'>
      <Dropdown inline fluid selection placeholder='Type' options={pokeTypes} onChange={handleChange} />

      {/* <Select placeholder='Type' className='ml-3 p-0' size='sm'>
        {types.length > 0 &&
          types.map(({ name }) => (
            <option key={name} value={name}>
              <Image src='/poketypes/logo.png' alt={name} width={24} height={24}></Image>
            </option>
          ))}
      </Select> */}
    </div>
  );
}
