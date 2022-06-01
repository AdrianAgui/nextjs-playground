import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Paginator from './Paginator';
import capitalize from 'core/utils/capitalize';
import { pokeTypes } from './../Header/TypeSelector/pokeTypes';

export default function PokemonDetail({ ...props }) {
  const [descriptionTexts, setDescriptionTexts] = useState([]);
  const { locale } = useRouter();

  const normalizeDescriptions = () => {
    const localeDescriptions = props.descriptions.filter((item) => item.language.name === locale);
    const texts = localeDescriptions.map((item) => item.flavor_text.replace('\f', ' '));
    const uniqueTexts = [...new Set([texts[0], texts[1], texts[2], texts[3], texts[4]])];
    return uniqueTexts.join(' ');
  };

  useEffect(() => {
    setDescriptionTexts(normalizeDescriptions());
  }, [props.id, locale]);

  return (
    <main>
      <Heading as='h1' fontSize='40px' align='center'>
        {props.name}&nbsp;<sup className='text-lg'>({props.names[0].name})</sup>
      </Heading>

      <div className='flex flex-col md:flex-row mt-12 mx-0 lg:mx-16'>
        <section className='w-full md:w-1/2 md:m-12 mb-12'>
          <img className='w-1/2 mx-auto mb-8' src={props.imageUrl} alt={`Image for ${props.name}`} />
          <Paginator id={props.id} />
        </section>

        <section className='md:w-1/2 p-8 bg-white rounded-xl'>
          <div className='flex justify-between'>
            <p className='text-md font-semibold text-gray-900 mb-3'>
              <span className='font-black mr-2'>#{props.id}</span>
              <span>{props.alias.find((item) => item.language.name === locale).genus}</span>
            </p>
            <div className='flex justify-center text-gray-900 mb-3'>
              {props.types.length > 0 &&
                props.types.map(({ type: { name } }) => {
                  return (
                    <div key={name} className='flex justify-center mr-3'>
                      <span className='text-sm font-semibold mr-1'>{capitalize(name)}</span>
                      <Image
                        src={pokeTypes.find((t) => t.key === name)?.image}
                        alt={props.types[0].type.name}
                        width={23}
                        height={23}
                        layout='fixed'
                      ></Image>
                    </div>
                  );
                })}
            </div>
          </div>
          <p className='text-sm text-gray-900 text-justify'>{descriptionTexts}</p>

          <div className='flex justify-center'>
            {props.front && <Image src={props.front} alt={props.name} width={120} height={120} layout='fixed'></Image>}
            <span className='mr-3'></span>
            {props.back && <Image src={props.back} alt={props.name} width={120} height={120} layout='fixed'></Image>}
          </div>
        </section>
      </div>
    </main>
  );
}
