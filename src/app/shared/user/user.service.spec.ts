import { TestBed, inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService, GET_USERS_AGE_URL, GET_USERS_FULLNAME_URL } from './user.service';
import { UserAge, UserFullName, User } from './interfaces';

const MOCK_USERS_AGE_SUCCESS_RESPONSE: UserAge[] = [
    { id: '1', age: 10},
    { id: '2', age: 28},
    { id: '4', age: 50}
];

const MOCK_USERS_FULLNAME_SUCCESS_RESPONSE: UserFullName[] = [
    {'id': '1', firstName: 'Jacob', lastName: 'Smith'},
    {'id': '2', firstName: 'Jessica', lastName: 'Jones'}
];

const MOCK_USERS: User[] = [
    { id: '1', firstName: 'Jacob', lastName: 'Smith', age: 10},
    { id: '2', firstName: 'Jessica', lastName: 'Jones', age: 28},
    { id: '4', age: 50}
];

const MOCK_USERS_AGE_ERROR_RESPONSE_BODY = [];
const MOCK_USERS_FULLNAME_ERROR_RESPONSE_BODY = [];

const MOCK_ERROR_RESPONSE_OPTIONS = { status: 400, statusText: 'Bad Request'};

describe('UserService', () => {

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
    });

    describe('getUsers()', () => {
        it('should return a list of users',
            inject([HttpTestingController, UserService], (httpMock: HttpTestingController, userService: UserService) => {
                userService.getUsers().subscribe( data => {
                    expect(data).toEqual(MOCK_USERS, 'Did not receive the data expected');
                });

                const userAgesRequest = httpMock.expectOne(GET_USERS_AGE_URL);
                const userFullNamesRequest = httpMock.expectOne(GET_USERS_FULLNAME_URL);

                // deliver success responses
                userAgesRequest.flush(MOCK_USERS_AGE_SUCCESS_RESPONSE);
                userFullNamesRequest.flush(MOCK_USERS_FULLNAME_SUCCESS_RESPONSE);

                // assert there are no outstanding requests
                httpMock.verify();
            })
        );
    });

    describe('getAllUsersAge()', () => {
        describe('if the http request succeeds', () => {
            it('should return a list of users that have an age',
                inject([HttpTestingController, UserService], (httpMock: HttpTestingController, userService: UserService) => {
                    userService.getAllUsersAge().subscribe( data => {
                        expect(data).toEqual(MOCK_USERS_AGE_SUCCESS_RESPONSE, 'Did not receive the data expected');
                    });

                    const req = httpMock.expectOne(GET_USERS_AGE_URL, 'either the request was not made or more than one request was made');
                    expect(req.request.method).toEqual('GET');

                    // deliver the success response
                    req.flush(MOCK_USERS_AGE_SUCCESS_RESPONSE);
                    // assert there are no outstanding requests
                    httpMock.verify();
                })
            );
        });
        describe('if the http request fails', () => {
            it('should return an empty array',
                inject([HttpTestingController, UserService], (httpMock: HttpTestingController, userService: UserService) => {
                    userService.getAllUsersAge().subscribe(
                        response => response,
                        error => expect(error).toBe(MOCK_USERS_AGE_ERROR_RESPONSE_BODY)
                    );

                    const req = httpMock.expectOne(GET_USERS_AGE_URL, 'either the request was not made or more than one request was made');
                    expect(req.request.method).toEqual('GET');

                    // deliver the error response
                    req.flush(MOCK_USERS_AGE_ERROR_RESPONSE_BODY, MOCK_ERROR_RESPONSE_OPTIONS);
                    // assert there are no outstanding requests
                    httpMock.verify();
                })
            );
        });
    });

    describe('getAllUsersFullName()', () => {
        describe('if the http request succeeds', () => {
            it('should return a list of users that have a fullname',
                inject([HttpTestingController, UserService], (httpMock: HttpTestingController, userService: UserService) => {
                    userService.getAllUsersFullName().subscribe( data => {
                        expect(data).toEqual(MOCK_USERS_FULLNAME_SUCCESS_RESPONSE, 'Did not receive the data expected');
                    });

                    const req = httpMock.expectOne(GET_USERS_FULLNAME_URL, 'either the request was not made or more than one request was made');
                    expect(req.request.method).toEqual('GET');

                    // deliver the success response
                    req.flush(MOCK_USERS_FULLNAME_SUCCESS_RESPONSE);
                    // assert there are no outstanding requests
                    httpMock.verify();
                })
            );
        });
        describe('if the http request fails', () => {
            it('should return an empty array',
                inject([HttpTestingController, UserService], (httpMock: HttpTestingController, userService: UserService) => {
                    userService.getAllUsersFullName().subscribe(
                        response => response,
                        error => expect(error).toBe(MOCK_USERS_FULLNAME_ERROR_RESPONSE_BODY)
                    );

                    const req = httpMock.expectOne(GET_USERS_FULLNAME_URL, 'either the request was not made or more than one request was made');
                    expect(req.request.method).toEqual('GET');

                    // deliver the error response
                    req.flush(MOCK_USERS_FULLNAME_ERROR_RESPONSE_BODY, MOCK_ERROR_RESPONSE_OPTIONS);
                    // assert there are no outstanding requests
                    httpMock.verify();
                })
            );
        });
    });
});
