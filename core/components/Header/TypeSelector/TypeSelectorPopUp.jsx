import { useState, useRef, memo, useCallback } from 'react';
import Image from 'next/image';

import { useGlobalContext } from 'core/context/GlobalContext';

import DropdownArrow from '../../Icons/DropdownArrow';
import capitalize from 'core/utils/capitalize';
import useOutsideClick from 'core/hooks/useOutsideClick';
import TypeSelector from './TypeSelector';
import { useI18n } from 'core/context/i18nContext';

function TypeSelectorPopUp() {
  const { setPokeType } = useGlobalContext();
  const { translator } = useI18n();

  const [selectedType, setSelectedType] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setOpenDropdown(false));

  const onSelect = useCallback((value) => {
    setSelectedType(value);
    setPokeType(value);
    setOpenDropdown(false);
  });

  return (
    <div ref={wrapperRef} className='ml-5'>
      <div className='relative inline-block text-left'>
        <div>
          <button
            type='button'
            onClick={() => setOpenDropdown(!openDropdown)}
            className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
          >
            {selectedType ? (
              <div className='flex items-center'>
                <Image src={`/poketypes/${selectedType}.png`} alt={selectedType} width={24} height={24} layout='fixed'></Image>
                <span className='ml-2'>{capitalize(selectedType)}</span>
              </div>
            ) : (
              translator('type-selector')
            )}
            <DropdownArrow />
          </button>
        </div>

        {openDropdown && <TypeSelector onSelect={onSelect} />}
      </div>
    </div>
  );
}

export default memo(TypeSelectorPopUp);
