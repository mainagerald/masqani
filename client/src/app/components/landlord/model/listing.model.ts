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
    infos: NewListingInfo,
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