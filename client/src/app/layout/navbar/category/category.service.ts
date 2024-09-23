import { Injectable } from '@angular/core';
import { Category, CategoryName } from "./category.model";
import { BehaviorSubject } from "rxjs";
import { IconName } from '@fortawesome/free-regular-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    {
      icon: "circle" as IconName,
      displayName: "All",
      technicalName: "ALL",
      activated: false
    },
    {
      icon: "building" as IconName,
      displayName: "Apartments",
      technicalName: "APARTMENTS",
      activated: false
    },
    {
      icon: "square" as IconName,
      displayName: "Studios",
      technicalName: "STUDIOS",
      activated: false
    },
    {
      icon: "bed" as IconName,
      displayName: "Bedsitters",
      technicalName: "BEDSITTERS",
      activated: false
    },
    {
      icon: "home" as IconName,
      displayName: "Farmhouses",
      technicalName: "FARMHOUSES",
      activated: false
    },
    {
      icon: "hotel" as IconName,
      displayName: "Hostels",
      technicalName: "HOSTELS",
      activated: false
    },
    {
      icon: "house-user" as IconName,
      displayName: "Mansionettes",
      technicalName: "MANSIONETTES",
      activated: false
    },
    {
      icon: "city" as IconName,
      displayName: "Townhouses",
      technicalName: "TOWNHOUSES",
      activated: false
    },
    {
      icon: "building" as IconName,
      displayName: "Duplexes",
      technicalName: "DUPLEXES",
      activated: false
    },
    {
      icon: "home" as IconName,
      displayName: "Villas",
      technicalName: "VILLAS",
      activated: false
    },
    {
      icon: "house" as IconName,
      displayName: "Bungalows",
      technicalName: "BUNGALOWS",
      activated: false
    },
    {
      icon: "warehouse" as IconName,
      displayName: "Lofts",
      technicalName: "LOFTS",
      activated: false
    },
    {
      icon: "building" as IconName,
      displayName: "Penthouses",
      technicalName: "PENTHOUSES",
      activated: false
    },
    {
      icon: "building" as IconName,
      displayName: "Condos",
      technicalName: "CONDOS",
      activated: false
    },
    {
      icon: "users" as IconName,
      displayName: "Shared Housing",
      technicalName: "SHARED_HOUSING",
      activated: false
    },
    {
      icon: "home" as IconName,
      displayName: "Executive Homes",
      technicalName: "EXECUTIVE_HOMES",
      activated: false
    },
    {
      icon: "house" as IconName,
      displayName: "Single Family Homes",
      technicalName: "SINGLE_FAMILY_HOMES",
      activated: false
    },
    {
      icon: "people-roof" as IconName,
      displayName: "Co-Housing",
      technicalName: "CO-HOUSING",
      activated: false
    },
    {
      icon: "hospital-user" as IconName,
      displayName: "Retirement Communities",
      technicalName: "RETIREMENT_COMMUNITIES",
      activated: false
    }
  ];

  private changeCategory$ = new BehaviorSubject<Category>(this.getCategoryByDefault());
  changeCategoryObs = this.changeCategory$.asObservable();

  changeCategory(category: Category): void {
    this.changeCategory$.next(category);
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCategoryByDefault() {
    return this.categories[0];
  }

  getCategoryByTechnicalName(technicalName: CategoryName): Category | undefined {
    return this.categories.find(category => category.technicalName === technicalName);
  }
}