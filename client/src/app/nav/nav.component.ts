import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, map, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  model : any = {};

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.toastr.success('sucessfully loggedIn');
        this.router.navigateByUrl('/members');
      },
      error: error => {
        this.toastr.error(error.error);
        console.log(error);
      }
    });
  }

  logout(){
    this.accountService.logot();
    this.router.navigateByUrl('/');
  }
}
