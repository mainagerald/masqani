import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';

import { UserModel } from '../model/user.model';
import { State } from '../model/state.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  location: Location = inject(Location);
  notConnected: string = 'NOT_CONNECTED';

  private fetchUser$: WritableSignal<State<UserModel>> = signal(
    State.Builder<UserModel>().forSucces({ email: this.notConnected })
  );
  fetchUser = computed(() => this.fetchUser$());
  
  fetchHttpUser(forceResync: boolean): Observable<UserModel> {
    const params = new HttpParams().set('forceResync', forceResync);
    return this.http.get<UserModel>(`${environment.API_URL}/auth/get-authenticated-user`, {
      params,
    });
  }

  fetch(forceResync: boolean): void {
    this.fetchHttpUser(forceResync).subscribe({
      next: (user) =>
        this.fetchUser$.set(State.Builder<UserModel>().forSucces(user)),
      error: (err) => {
        if (
          err.status === HttpStatusCode.Unauthorized &&
          this.isAuthenticated()
        ) {
          this.fetchUser$.set(
            State.Builder<UserModel>().forSucces({ email: this.notConnected })
          );
        } else {
          this.fetchUser$.set(State.Builder<UserModel>().forError(err));
        }
      },
    });
  }

  isAuthenticated(): boolean {
    if (this.fetchUser$().value) {
      return this.fetchUser$().value!.email !== this.notConnected;
    } else {
      return false;
    }
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (this.fetchUser$().value!.email === this.notConnected) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.fetchUser$().value!.authorities!.some((authority: string) =>
      authorities.includes(authority)
    );
  }

  login(): void {
    location.href = `${location.origin}${this.location.prepareExternalUrl(
      'oauth2/authorization/okta'
    )}`;
  }
  logout(): void {
    this.http.post(`${environment.API_URL}/auth/logout`, {}).subscribe({
      next: (response: any) => {
        this.fetchUser$.set(
          State.Builder<UserModel>().forSucces({ email: this.notConnected })
        );
        location.href = response.logoutUrl;
      },
    });
  }
}
