import { Component, effect, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {MenuModule} from 'primeng/menu';
import { CategoryComponent } from './category/category.component';
import { AvatarComponent } from './avatar/avatar.component';
import{DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { ToastService } from '../toast.service';
import { AuthService } from '../../core/auth/auth.service';
import { UserModel } from '../../core/model/user.model';
import { CreatePropertyComponent } from '../../components/landlord/create-property/create-property.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    FontAwesomeModule,
    ToolbarModule,
    MenuModule,
    CategoryComponent,
    AvatarComponent
  ],
  providers:[DialogService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  toastService: ToastService = inject(ToastService);
  dialogService: DialogService = inject(DialogService);
  ref: DynamicDialogRef | undefined;


  location: string = "Anywhere"
  guests:string = "Add guests"
  dates: string="Any week"
  currentMenuItems: MenuItem[] | undefined = []
  public connectedUser: UserModel = {email: this.authService.notConnected}
  
  login=()=>this.authService.login();
  logout=()=>this.authService.logout();


  constructor(){
    effect(()=>{
      if(this.authService.fetchUser().status==="OK"){
        this.connectedUser = this.authService.fetchUser().value!;
        this.currentMenuItems = this.fetchMenu();
      }
    })
  }
  
  ngOnInit(): void {
    this.authService.fetch(false);
    // this.toastService.send({severity: "info", summary:"Welcome to masQani!"})    
  }

  hasToBeLandlord(): boolean{
    return this.authService.hasAnyAuthority("ROLE_LANDLORD");
  }

  private fetchMenu(): MenuItem[] {
    if(this.authService.isAuthenticated()){
    return [
      {
        label: "My properties",
        routerLink: "landlord/properties",
        visible: this.hasToBeLandlord(),
      },
      {
        label: "My rental",
        routerLink: "renting",
      },
      {
        label: "My reservations",
        routerLink: "landlord/reservation",
        visible: this.hasToBeLandlord(),
      }, 
      {
        label: "Log out",
        command: this.logout
      }
  ]
  }else{
    return [
      {
        label: "Sign up",
        styleClass: "font-bold",
        command: this.login
      },
      {
        label: "Log in",
        command: this.login
      }
    ]
  }
}

openNewListing(): void{
  this.ref = this.dialogService.open(CreatePropertyComponent,
    {
      width: "70%",
      height: "80%",
      styleClass: 'custom-dialog',
      header: "List your property",
      closable: true,
      focusOnShow: true,
      modal: true,
      showHeader: true
  })
}
}
