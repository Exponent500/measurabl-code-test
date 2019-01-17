import { Component, OnInit, OnDestroy} from '@angular/core';

import { Subscription } from 'rxjs';

import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/interfaces';

@Component({
    selector: 'measurabl-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
    constructor(private userService: UserService) {}

    subscriptions: Subscription[] = [];
    getUsersSubscription: Subscription = new Subscription();
    users: User[] = [];

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(users => this.users = users);
    }

    ngOnDestroy() {
        this.subscriptions.map(subscription => subscription.unsubscribe());
    }
}
