/**
 * The AppModule class is used to import then declare all of the components that will be used in the app, 
 * as well as to import all of the modules that will be used. The AppComponent is bootstrapped when the
 * module is bootstrapped, and thereby gets access to the module contents. By virtue of being children of
 * the AppComponent (which is the root component), all the other components get access to exported 
 * declarables of the imported modules in the AppModule too, as well as to the other child components.
 * @module AppModule
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/**angular material */
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


/**for server connection */
import {HttpClientModule} from '@angular/common/http';

/**app router */
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**app components */
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { SynopsisComponent } from './synopsis/synopsis.component';

/**defined navigation paths */
const appRoutes: Routes = [
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'movies', component: MovieCardComponent},
  {path: 'favorite', component: FavoriteMoviesComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
];

@NgModule({//organize the app, extend functionality from external libraries, and configure the compiler and injector.
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    NavigationComponent,
    FavoriteMoviesComponent,
    GenreComponent,
    DirectorComponent,
    SynopsisComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
