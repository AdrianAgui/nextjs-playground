import { useState, useRef, memo } from 'react';
import { LIMIT_SEARCH } from '../../utils/constants';
import { useI18n } from 'core/context/i18nContext';
import Autocomplete from 'core/components/Header/Autocomplete';

function Searcher() {
  const { translator } = useI18n();

  const [results, setResults] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const searchRef = useRef();

  const handleChange = async () => {
    const q = searchRef.current?.value;

    const queryResultsFetched = await fetch(`/api/search?q=${q}&limit=${LIMIT_SEARCH}`);
    const queryResults = await queryResultsFetched.json();
    setResults(queryResults);
  };

  const onFocus = () => setShowAutocomplete(true);
  const onBlur = () => setTimeout(() => setShowAutocomplete(false), 150);

  return (
    <div className='searcher'>
      <input
        className='px-5 py-3 text-md border border-gray-400 rounded-3xl outline-0 text-center'
        type='search'
        ref={searchRef}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={translator('placeholder.search')}
      />

      {showAutocomplete && Boolean(results.length) && <Autocomplete results={results}></Autocomplete>}
    </div>
  );
}

export default memo(Searcher);
