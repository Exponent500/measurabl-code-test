import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, combineLatest, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User, UserAge, UserFullName } from './interfaces';

const BASE_URL = 'https://api.myjson.com/bins/';
/**
 * Assumptions:
 * 1. No authentication needed for these endpoints
 * 2. Each endpoint returns an empty array if there is no data to be provided
 * 3. If there is data returned from the endpoints, then:
 *      a.  the objects within the response will always have all the keys defined within the interfaces described
 *          above (for example, the User Age response will always have an id and age property within each object returned)
 *      b.  the objects within the response will never have null values for any of the keys.
 */
export const GET_USERS_AGE_URL = `${BASE_URL}xqrsi`;
export const GET_USERS_FULLNAME_URL = `${BASE_URL}szaya`;

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) {}

    /**
     * Returns all the users that exist. Some users may not have age or firstName/lastName data.
     * This is because some users do not have this data in the database.
     */
    getUsers(): Observable<User[]> {
        const usersAge$ = this.getAllUsersAge();
        const usersFullName$ = this.getAllUsersFullName();

        return combineLatest(usersAge$, usersFullName$, (usersAge, usersFullName) => {
            const users: User[] = [...usersAge];
            usersFullName.forEach(userFullName => {
                const index = users.findIndex(user => user.id === userFullName.id);
                if (index !== -1) {
                    users[index].firstName = userFullName.firstName;
                    users[index].lastName = userFullName.lastName;
                } else {
                    users.push(userFullName);
                }
            });
            return users;
        });
    }

    /**
     * Gets all of the users whom have age data stored in the database.
     */
    getAllUsersAge(): Observable<UserAge[]> {
        return this.httpClient
            .get<UserAge[]>(GET_USERS_AGE_URL, {})
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return of([]);
                }
            ));
    }

    /**
     * Gets all of the users whom have first and last names stored in the database.
     */
    getAllUsersFullName(): Observable<UserFullName[]> {
        return this.httpClient
            .get<UserFullName[]>(GET_USERS_FULLNAME_URL, {})
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return of([]);
                }
            ));
    }
}
