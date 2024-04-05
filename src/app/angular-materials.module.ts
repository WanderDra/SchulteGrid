import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
    ],
    imports: [
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: []
  })
  export class AngularMaterialModule { }