#Bookshop
1.D’abord, pensez la structure du projet:
ng new bookshop --style=scss --skip-tests=true
//—skip-tests=true:ne pas générer les fichiers de tests.
//-style=scss: avoir le style scss
//components
ng g c auth/signup
ng g c auth/signin
ng g c book-list
ng g c book-list/single-book
ng g c book-list/book-form
ng g c header

//services
ng g s services/auth
ng g s services/books
ng g s services/auth-guards


//bootstrap
npm install bootstrap --save
//change bootstrap version

npm install --save bootstrap@3.3.7


//add boostrap css in the project
"../node_modules/bootstrap/dist/css/bootstrap.css"

import service in providers
FormsModule  depuis @angular/forms
ReactiveFormsModule  depuis @angular/forms
HttpClientModule    depuis @angular/common/http

//routing pour la page
edit navbar
include header dans le app.html and add a container for the content of different pages.

//install firebase
npm install firebase --save
go to firebase, create a project,copy the configuration script, add it in the contructor of app.component.ts.
choose a way to connect for authentification like email/facebook etc
