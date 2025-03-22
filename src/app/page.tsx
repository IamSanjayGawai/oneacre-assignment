
import PropertyGrid from './components/PropertyGrid';
import PropertyMap from './components/PropertyMap';

export default function Home() {
  return (
    <>
<main className="min-h-screen">
      <div className="container mx-auto py-8 px-4">

        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Property Map</h2>
          <PropertyMap />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Available Properties</h2>
          <PropertyGrid />
        </section>
      </div>
    </main>
    </>
  );
}
