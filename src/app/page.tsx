
import Navbar from '@/components/Navbar';
import PropertyGrid from '../components/PropertyGrid';
import PropertyMap from '../components/PropertyMap';

export default function Home() {
  return (
    <>
<div className=" bg-gray-100 min-h-screen">
  
<Navbar />
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
    </div>
    </>
  );
}
