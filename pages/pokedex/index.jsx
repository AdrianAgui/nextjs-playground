import PageLayout from 'src/components/PageLayout';
import Pokedex from 'src/components/Pokedex/Pokedex';

export default function PokedexPage() {
  return (
    <PageLayout title={`Pokedex`}>
      <Pokedex />
    </PageLayout>
  );
}
