import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export interface IUser {
  id?: number;
  name?: string;
  phone?: string;
  password?: string;
}

export interface IContact {
  id?: number;
  name?: string;
  photo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // json-server --watch db.json
  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
  ) { }

  getActualState(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  registration(user: IUser): Observable<IUser | null>{
      return this.getListUsers().pipe(
        map(users => users.filter(us => us.phone === user.phone)[0]),
        switchMap(res => !!res ? of(null) : this.http.post(this.url + '/users/', user))
      );
  }

  logIn(phone: string, password: string): Observable<IUser> {
    return this.getListUsers().pipe(
      // FIXME это должен делать сервер (backend)
      map(users => users.filter(user => user.phone === phone && user.password === password)[0]),
      tap(() => localStorage.setItem('isLoggedIn', 'true'))
    );
  }

  getListUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(this.url + '/users');
  }

  getListContact(): Observable<Array<IContact>> {
    return this.http.get<Array<IContact>>(this.url + '/listContact');
  }

  addContact(newContact: object): Observable<IContact>{
    return this.http.post(this.url + '/listContact/', newContact);
  }

  deleteContact(id: number): Observable<object> {
    return this.http.delete<IContact>(this.url + '/listContact/' + id);
  }

  editContact(id: number, newContact: object): Observable<IContact> {
    return this.http.patch<IContact>(this.url + '/listContact/' + id, newContact);
  }

}
