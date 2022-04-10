import { Button } from '@chakra-ui/react';

export default function Pagination({ page, setPage }) {
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page >= 1) setPage(page + 1);
  };

  return (
    <div className='flex justify-center items-center pb-8'>
      <Button onClick={handlePrevPage} disabled={page === 1}>
        Prev
      </Button>

      <span className='mx-7 text-2xl font-bold'>{page}</span>

      <Button onClick={handleNextPage} disabled={page === 50}>
        Next
      </Button>
    </div>
  );
}
