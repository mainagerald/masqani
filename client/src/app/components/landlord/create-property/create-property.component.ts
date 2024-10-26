import { Component, effect, inject } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '../../../layout/toast.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { Step } from './step.model';
import {
  CreatedListing,
  Description,
  NewListing,
  NewListingInfo,
} from '../model/listing.model';
import { NewListingPictures } from '../model/listing-picture.model';
import { LandlordListingService } from '../landlord-listing.service';
import { State } from '../../../core/model/state.model';
import {
  Category,
  CategoryName,
} from '../../../layout/navbar/category/category.model';
import { FooterStepComponent } from '../../../shared/footer-step/footer-step.component';
import { CategoryComponent } from '../../../layout/navbar/category/category.component';
import { CategoryStepComponent } from './step/category-step/category-step.component';
import { LocationStepComponent } from './step/location-step/location-step.component';
import { InfoStepComponent } from './step/info-step/info-step.component';
import { PictureStepComponent } from './step/picture-step/picture-step.component';
import { DescriptionStepComponent } from './step/description-step/description-step.component';
import { PriceVO } from '../model/listing-vo.model';
import { PriceStepComponent } from './step/price-step/price-step.component';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [
    CategoryComponent,
    FooterStepComponent,
    CategoryStepComponent,
    LocationStepComponent,
    InfoStepComponent,
    PictureStepComponent,
    DescriptionStepComponent,
    PriceStepComponent
  ],
  templateUrl: './create-property.component.html',
  styleUrl: './create-property.component.scss',
})
export class CreatePropertyComponent {
  CATEGORY: string = 'category';
  LOCATION: string = 'location';
  INFO: string = 'info';
  PHOTOS: string = 'pictures';
  DESCRIPTION: string = 'description';
  PRICE: string = 'price';

  dialogDynamiceRef: DynamicDialogRef = inject(DynamicDialogRef);
  toastService: ToastService = inject(ToastService);
  authService: AuthService = inject(AuthService);
  listingService: LandlordListingService = inject(LandlordListingService);
  router: Router = inject(Router);

  constructor() {
    this.listenFetchUser();
    this.listenListingCreation();
  }

  steps: Step[] = [
    {
      id: this.CATEGORY,
      idNext: this.LOCATION,
      idPrevious: null,
      isValid: false,
    },
    {
      id: this.LOCATION,
      idNext: this.INFO,
      idPrevious: this.CATEGORY,
      isValid: false,
    },
    {
      id: this.INFO,
      idNext: this.PHOTOS,
      idPrevious: this.LOCATION,
      isValid: false,
    },
    {
      id: this.PHOTOS,
      idNext: this.DESCRIPTION,
      idPrevious: this.INFO,
      isValid: false,
    },
    {
      id: this.DESCRIPTION,
      idNext: this.PRICE,
      idPrevious: this.PHOTOS,
      isValid: false,
    },
    {
      id: this.PRICE,
      idNext: null,
      idPrevious: this.DESCRIPTION,
      isValid: false,
    },
  ];

  currentStep: Step = this.steps[0];

  nextStep(): void {
    if (this.currentStep.idNext != null) {
      this.currentStep = this.steps.filter(
        (step: Step) => step.id === this.currentStep.idNext
      )[0];
    }
  }

  previousStep(): void {
    if (this.currentStep.idPrevious != null) {
      this.currentStep = this.steps.filter(
        (step: Step) => step.id === this.currentStep.idPrevious
      )[0];
    }
  }

  isAllStepsValid(): boolean {
    return (
      this.steps.filter((step) => step.isValid).length === this.steps.length
    );
  }

  newListing: NewListing = {
    category: 'APARTMENTS',
    info: {
      bedrooms: { value: 0 },
      bathrooms: { value: 0 },
    },
    pictures: new Array<NewListingPictures>(),
    location: '',
    description: {
      title: { value: '' },
      description: { value: '' },
    },
    price: { value: 0 },
  };

  loadingCreation: boolean = false;

  createListing(): void {
    this.loadingCreation = true;
    this.listingService.create(this.newListing);
    console.log("creating--------", this.newListing);
    
  }

  ngOnDestroy(): void {
    this.listingService.resetListingCreation();
  }

  listenFetchUser(): void {
    effect(() => {
      if (
        this.authService.fetchUser().status === 'OK' &&
        this.listingService.createSignal().status === 'OK'
      ) {
        this.router.navigate(['landlord', 'properties']);
      }
    });
  }

  listenListingCreation(): void {
    effect(() => {
      let createdListingState = this.listingService.createSignal();
      if (createdListingState.status === 'OK') {
        this.onCreateOk(createdListingState);
      } else if (createdListingState.status === 'ERROR') {
        this.onCreateError();
      }
    });
  }

  onCreateOk(createdListingState: State<CreatedListing>): void {
    this.loadingCreation = false;
    this.toastService.send({
      severity: 'info',
      summary: 'Success',
      detail: 'Listing created successfully!',
    });
    this.dialogDynamiceRef.close(createdListingState.value?.publicId);
    this.authService.fetch(true);
  }

  onCreateError(): void {
    this.loadingCreation = false;
    this.toastService.send({
      severity: 'error',
      summary: 'Error',
      detail: 'Creation failed, please try again.',
    });
  }

  onCategoryChange(newCategory: CategoryName): void {
    this.newListing.category = newCategory;
  }

  onValidityChange(validity: boolean): void {
    this.currentStep.isValid = validity;
    console.log("on validity change. valid? ", validity);
  }
  onLocationChange(newLocation: string) {
    this.newListing.location = newLocation;
  }
  onInfoChange(newInfo: NewListingInfo) {
    this.newListing.info = newInfo;
  }
  onPictureChange(newPictures: NewListingPictures[]){
    this.newListing.pictures = newPictures;
  }
  onDescriptionChange(newDescription: Description){
    this.newListing.description=newDescription;
  }
  onPriceChange(newPrice: PriceVO){
    this.newListing.price=newPrice;
  }
}
