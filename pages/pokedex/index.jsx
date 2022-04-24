import PageLayout from 'core/components/PageLayout';
import Pokedex from 'core/components/Pokedex/Pokedex';

export default function PokedexPage() {
  return (
    <PageLayout title={`Pokedex`}>
      <Pokedex />
    </PageLayout>
  );
}
