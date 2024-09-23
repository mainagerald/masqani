import { IconName } from '@fortawesome/free-regular-svg-icons';

export type CategoryName =
  | 'ALL'
  | 'APARTMENTS'
  | 'STUDIOS'
  | 'BEDSITTERS'
  | 'FARMHOUSES'
  | 'HOSTELS'
  | 'MANSIONETTES'
  | 'TOWNHOUSES'
  | 'DUPLEXES'
  | 'VILLAS'
  | 'BUNGALOWS'
  | 'LOFTS'
  | 'PENTHOUSES'
  | 'CONDOS'
  | 'SHARED_HOUSING'
  | 'EXECUTIVE_HOMES'
  | 'SINGLE_FAMILY_HOMES'
  | 'CO-HOUSING'
  | 'RETIREMENT_COMMUNITIES';

export interface Category {
  icon: IconName;
  displayName: string;
  technicalName: CategoryName;
  activated: boolean;
}
