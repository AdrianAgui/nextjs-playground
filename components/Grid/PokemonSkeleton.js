import ContentLoader from 'react-content-loader';

const PokemonSkeleton = (props) => (
  <ContentLoader speed={1.5} width={156} height={124} viewBox='0 0 156 124' backgroundColor='#a3a3a3' foregroundColor='#5c5c5c' {...props}>
    <rect x='63' y='12' rx='3' ry='3' width='88' height='6' />
    <rect x='62' y='30' rx='3' ry='3' width='52' height='6' />
    <circle cx='25' cy='25' r='25' />
  </ContentLoader>
);

export default PokemonSkeleton;
