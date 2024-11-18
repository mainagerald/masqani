import { CategoryName } from "../../../layout/navbar/category/category.model";
import { NewListingPictures } from "./listing-picture.model";
import { BathroomsVO, BedroomsVO, DescriptionVO, PriceVO, TitleVO } from "./listing-vo.model";

export interface NewListingInfo{
    bedrooms: BedroomsVO,
    bathrooms: BathroomsVO,
}

export interface NewListing{
    category: CategoryName,
    location: string,
    info: NewListingInfo,
    pictures: Array<NewListingPictures>,
    description: Description,
    price: PriceVO
}

export interface Description{
    title: TitleVO,
    description: DescriptionVO
}

export interface CreatedListing{
    publicId: string
}

export interface DisplayPicture {
    file?: string,
    fileContentType?: string,
    isCover?: boolean
  }
export interface CardListing {
    price: PriceVO,
    location: string,
    cover: DisplayPicture,
    bookingCategory: CategoryName,
    publicId: string,
    loading: boolean
  }

  export interface Listing {
    description: Description,
    pictures: Array<DisplayPicture>,
    infos: NewListingInfo,
    price: PriceVO,
    category: CategoryName,
    location: string,
    landlord: LandlordListing
  }

  export interface LandlordListing {
    firstname: string,
    imageUrl: string,
  }