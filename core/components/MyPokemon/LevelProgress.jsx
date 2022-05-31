export default function LevelProgress({ level }) {
  return (
    <>
      <section className='flex justify-end mr-6 font-semibold text-xl'>
        <p className='text-gray-600'>
          Level: <span className='text-2xl font-bold text-black'>{level}</span>{' '}
        </p>
      </section>
    </>
  );
}
