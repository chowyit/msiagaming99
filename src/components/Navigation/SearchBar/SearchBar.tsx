import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import useDebounce from '../../../shared/hooks/useDebounce';

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const debounceSearch = useDebounce(search, 300);

  return (
    <div className='flex justify-center border-2 border-grey69 '>
      <input type='text' className='w-[225px] h-[50px] block p-2' placeholder='Search' />
      <div className='h-[50px] w-[50px] flex justify-center items-center border-l-2 border-grey69 hover:bg-orange-400'>
        <FiSearch strokeWidth={3} />
      </div>
    </div>
  );
};

export default SearchBar;
