import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {MapsComponent} from '../../maps/maps.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatRippleModule} from '@angular/material/core';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {GoogleMapsModule} from "@angular/google-maps";
import {ComponentsModule} from "../../components/components.module";
import {RegisterComponent} from "../../init/resgister/register.component";
import {LoginComponent} from "../../init/login/login.component";
import {MotorcycleComponent} from "../../init/motorcycle/motorcycle.component";
import {LogoutComponent} from "../../init/logout/logout.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NgxMaskDirective} from "ngx-mask";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        GoogleMapsModule,
        ComponentsModule,
        NgxChartsModule,
        NgxMaskDirective,
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        MapsComponent,
        RegisterComponent,
        LoginComponent,
        MotorcycleComponent,
        LogoutComponent
    ]
})

export class AdminLayoutModule {
}
