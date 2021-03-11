import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IRequisition {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  // json-server --watch db.json
  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
  ) {}

  sendRequisition(application: IRequisition): Observable<IRequisition> {
    return this.http.post(this.url + '/requisitions/', application);
  }

  getAllRequisitions(): Observable<Array<IRequisition>> {
    return this.http.get<Array<IRequisition>>(this.url + '/requisitions');
  }

}
