import React from "react";
import { Property } from "../lib/types";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Heart, Share2 } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface PropertyCardProps {
  property: Property | null;
  loading?: boolean; // ✅ Accept loading state
}

export default function PropertyCard({ property, loading }: PropertyCardProps) {
  const [liked, setLiked] = React.useState(false);

  if (loading) {
    return (
      <Card className="overflow-hidden h-full flex flex-col shadow-2xl rounded-2xl border-0 animate-pulse">
        <CardContent className="p-0">
          <div className="w-full h-48 bg-gray-300 rounded-md" />
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 gap-2">
          <div className="w-3/4 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
        </CardFooter>
      </Card>
    );
  }

  if (!property) return null;

  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-2xl rounded-2xl border-0">
      <CardContent className="p-0">
        <Carousel className="w-full">
          <CarouselContent>
            {property.land_media?.map((media: { image: string | StaticImport; }, index: React.Key | null | undefined) => (
              <CarouselItem key={index}>
                <div className="relative h-48 w-full">
                  <Image
                    src={media.image}
                    alt={`Property Image ${(index as number) + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/80" />
          <CarouselNext className="right-2 bg-white/80" />
        </Carousel>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 gap-2">
        <div className="flex justify-between w-full">
          <h3 className="text-[16px] font-semibold">
            ₹ {property.price_per_acre} {property.price_type}/acre
          </h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setLiked(!liked)}>
              <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">{property.slug}</p>
      </CardFooter>
    </Card>
  );
}




