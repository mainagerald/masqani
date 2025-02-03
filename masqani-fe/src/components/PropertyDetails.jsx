import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Bed, Bath, Calendar } from 'lucide-react';
import { getPropertyByPublicId } from '@/service/api/landlordPropertyApi';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { useAuth } from '@/utils/auth/AuthContext';

const PropertyDetails = ({ prop, isOpen, onClose, onEdit }) => {
  const [property, setPropertyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (prop?.publicId) {
      fetchPropertyDetail(prop.publicId);
    }
  }, [prop?.publicId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price?.value || 0);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Date not available';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(timestamp * 1000)); // Convert seconds to milliseconds
  };

  async function fetchPropertyDetail(publicId) {
    setIsLoading(true);
    try {
      const res = await getPropertyByPublicId(publicId);
      setPropertyData(res);
    } catch (error) {
      toast.error("Error fetching your property. Please try again.")
      console.error("Error encountered: ", error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Spinner />;
  if (!property) return null;

  console.log("prop landlord---", property.landlord);


  const coverImage = property.pictures?.find(pic => pic.isCover)?.fileUrl || property.pictures?.[0]?.fileUrl;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-1">
        <DialogHeader>
          <DialogTitle>{property.description?.title?.value || 'Property Details'}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-8rem)] p-1">
          <div className="space-y-4">
            {/* Image Carousel */}
            <Carousel className="w-full">
              <CarouselContent>
                {property.pictures?.map((picture, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={picture.fileUrl}
                      alt={`Property view ${index + 1}`}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Price and Category */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{formatPrice(property.price)}</h2>
              <Badge variant={property.category === 'RENT' ? 'secondary' : 'destructive'}>
                {property.category}
              </Badge>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <Bed className="mr-2" />
                <span>{property.infos?.bedrooms?.value || 0} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-2" />
                <span>{property.infos?.baths?.value || 0} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <span>Listed {formatDate(property.createdAt)}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{property.description?.description?.value || 'No description available'}</p>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-2" />
                <span>{property.location || 'Location not available'}</span>
              </div>
            </div>

            {/* Landlord Information */}
            {/* {property.landlord && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                <div className="text-gray-600">
                  <p>{property.landlord?.name}</p>
                  <p>{property.landlord?.email}</p>
                  <p>{property.landlord?.phone}</p>
                </div>
              </div>
            )} */}
          </div>
        </ScrollArea>

        <div className="flex justify-end m-1">
        <div>
            {user.publicId != property.landlord && (
              <Button onClick={() => {/* Handle property request */ }}>
                Request Property
              </Button>
            )}
          </div>
          <div>
            {user.publicId == property.landlord && (
              <Button onClick={onEdit}>
                Edit Property
              </Button>
            )
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetails;