import { useState, useRef } from 'react';
import { LIMIT_SEARCH } from '../../utils/constants';
import Autocomplete from 'src/components/Header/Autocomplete';

export default function Searcher() {
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
        className='px-5 py-3 text-md border border-gray-400 rounded-3xl outline-0'
        type='search'
        ref={searchRef}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder='Search pokemon...'
      />

      {showAutocomplete && Boolean(results.length) && <Autocomplete results={results}></Autocomplete>}
    </div>
  );
}
