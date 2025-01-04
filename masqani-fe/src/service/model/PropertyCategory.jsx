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
  { id: "ALL", icon: FaHome },
  { id: "APARTMENT", icon: PiBuildingApartment },
  { id: "STUDIOS", icon: FaBed },
  { id: "BEDSITTER", icon: FaUserFriends },
  { id: "FARMHOUSE", icon: FaTree },
  { id: "HOSTEL", icon: FaHotel },
  { id: "MANSIONETTE", icon: GiFamilyHouse },
  { id: "TOWNHOUSE", icon: GiBlockHouse },
  { id: "DUPLEX", icon: BsHousesFill },
  { id: "VILLA", icon: FaHome },
  { id: "BUNGALOW", icon: GiHouse },
  { id: "LOFT", icon: FaBuilding },
  { id: "PENTHOUSE", icon: RiBuilding2Fill },
  { id: "CONDO", icon: FaRegBuilding },
  { id: "SHARED_HOUSING", icon: FaUsers },
  { id: "EXECUTIVE_HOME", icon: FaBusinessTime },
  { id: "SINGLE_FAMILY_HOME", icon: FaHouseUser },
  { id: "CO_HOUSING", icon: FaPeopleArrows },
  { id: "RETIREMENT_COMMUNITY", icon: FaUserShield },
  { id: "MODULAR_HOME", icon: MdWarehouse },
];

export default PropertyCategories;
