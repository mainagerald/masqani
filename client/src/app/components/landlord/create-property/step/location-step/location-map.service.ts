import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { State } from '../../../../../core/model/state.model';
import { County } from './location-map.model';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationMapService {

  http: HttpClient = inject(HttpClient);
  private counties$: WritableSignal<State<Array<County>>> = signal(State.Builder<Array<County>>().forInit());
  counties = computed(()=>this.counties$());

  private fetchCounty$ = new Observable<Array<County>>();

  constructor() {
    this.initFetchGetAllCounties();
    this.fetchCounty$.subscribe();
   }

  initFetchGetAllCounties(): void{
    this.fetchCounty$ = this.http.get<Array<County>>("/assets/counties.json")
    .pipe(
      tap(counties=>this.counties$.set(State.Builder<Array<County>>().forSucces(counties))),
      catchError(err=> {
        this.counties$.set(State.Builder<Array<County>>().forError(err))
        return of(err);
      }),
      shareReplay(1)
    )
  }

  public getCountyByCode(code: string):Observable<County>{
    return this.fetchCounty$.pipe(
      map(counties => counties.filter(county => county.code === code)),
      map(counties=>counties[0])
    );
  }
}
