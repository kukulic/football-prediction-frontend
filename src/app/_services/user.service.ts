import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(API_URL + `/users`);
  }
/*
  getById(id: number) {
    return this.http.get(API_URL + `/users/` + id);
  }
*/
  register(user: User) {
    return this.http.post(API_URL + `/register`, user);
  }

  getUserRole(username: string, password: string): Observable<any> {
    var params =
      {
        "username": username,
        "password": password
      }
    return this.http.get(API_URL + `/getUserRole`, {params: params});
  }

  getAllUsers(): Observable<any> {

    return this.http.get(API_URL + `/getAllUsers`);
  }
/*
  update(user: User) {
    return this.http.put(API_URL + `/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(API_URL + `/users/` + id);
  }
  */
}
