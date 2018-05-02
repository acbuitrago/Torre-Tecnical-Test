import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ProfileComponent, DialogAskUser } from './profile.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  error:string;

  constructor(public dialog: MatDialog,private router: Router) { }

  ngOnInit() {
  }

  openDialog(){
    let dialogRef = this.dialog.open(DialogAskUser, {
       width: '250px',
       data: { error: this.error}
     });

     dialogRef.afterClosed().subscribe(result => {
       if(result){
         this.router.navigate([result]);

       }else{
         this.error= "Invalid profileid";
         this.openDialog();
       }
     });
  }


}
