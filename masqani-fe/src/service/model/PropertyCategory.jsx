import { BsHousesFill } from 'react-icons/bs';
import {
  FaHome,
  FaBuilding,
  FaBed,
  FaUserFriends,
  FaTree,
  FaHotel,
  FaRegBuilding,
  FaUsers,
  FaBusinessTime,
  FaHouseUser,
  FaPeopleArrows,
  FaUserShield,
} from 'react-icons/fa';
import { GiBlockHouse, GiFamilyHouse, GiHouse } from 'react-icons/gi';
import { MdWarehouse } from 'react-icons/md';
import { PiBuildingApartment } from 'react-icons/pi';
import { RiBuilding2Fill } from 'react-icons/ri';

const PropertyCategories = [
    { id: "ALL", name: "All Properties", icon: FaHome },
    { id: "APARTMENT", name: "Apartment", icon: PiBuildingApartment },
    { id: "STUDIOS", name: "Studios", icon: FaBed },
    { id: "BEDSITTER", name: "Bedsitter", icon: FaUserFriends },
    { id: "FARMHOUSE", name: "Farmhouse", icon: FaTree },
    { id: "HOSTEL", name: "Hostel", icon: FaHotel },
    { id: "MANSIONETTE", name: "Mansionette", icon: GiFamilyHouse },
    { id: "TOWNHOUSE", name: "Townhouse", icon: GiBlockHouse },
    { id: "DUPLEX", name: "Duplex", icon: BsHousesFill },
    { id: "VILLA", name: "Villa", icon: FaHome },
    { id: "BUNGALOW", name: "Bungalow", icon: GiHouse },
    { id: "LOFT", name: "Loft", icon: FaBuilding },
    { id: "PENTHOUSE", name: "Penthouse", icon: RiBuilding2Fill },
    { id: "CONDO", name: "Condo", icon: FaRegBuilding },
    { id: "SHARED_HOUSING", name: "Shared Housing", icon: FaUsers },
    { id: "EXECUTIVE_HOME", name: "Executive Home", icon: FaBusinessTime },
    { id: "SINGLE_FAMILY_HOME", name: "Single Family Home", icon: FaHouseUser },
    { id: "CO_HOUSING", name: "Co-Housing", icon: FaPeopleArrows },
    { id: "RETIREMENT_COMMUNITY", name: "Retirement Community", icon: FaUserShield },
    { id: "MODULAR_HOME", name: "Modular Home", icon: MdWarehouse },
];
export default PropertyCategories;
