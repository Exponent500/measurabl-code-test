import { NgModule } from '@angular/core';

import { HeaderComponent } from './layout/header/header.component';
import { UserService } from '../shared/user/user.service';
import { FooterComponent } from './layout/footer/footer.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SideNavComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SideNavComponent
    ],
    providers: [UserService]
})

export class CoreModule {}
