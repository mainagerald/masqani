import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CreatedListing, NewListing } from './model/listing.model';
import { State } from '../../core/model/state.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LandlordListingService {

  http: HttpClient = inject(HttpClient);
  
  constructor() { }

  private create$: WritableSignal<State<CreatedListing>> = signal(State.Builder<CreatedListing>().forInit());
  createSignal = computed(()=>this.create$());

  create(newListing: NewListing): void{
    const formData:FormData = new FormData();
    for(let i=0;i<newListing.pictures.length;++i){
      formData.append("picture: " + i, newListing.pictures[i].file);
    }

    const clone: NewListing = structuredClone(newListing);
    clone.pictures=[];

    formData.append("dto", JSON.stringify(clone));
    this.http.post<CreatedListing>(`${environment.API_URL}/landlord/create-listing`, formData).subscribe(
      {
        next: listing => this.create$.set(State.Builder<CreatedListing>().forSucces(listing)),
        error: err => this.create$.set(State.Builder<CreatedListing>().forError(err))
      }
    );
  }

  resetListingCreation(): void{
    this.create$.set(State.Builder<CreatedListing>().forInit());
  }
}
