import { Component, OnInit, Inject } from '@angular/core';
import { ProfileService } from './profile.service';
import {Router, ActivatedRoute, ParamMap,Params} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {LinkedInService} from 'angular-linkedin-sdk';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userid:string;
  submitting:false;
  userData:any;
  error:string;
  sections:string[]=[];
  userImage;
  constructor(  private route: ActivatedRoute,private router: Router, private manager: ProfileService, public dialog: MatDialog, private sanitizer: DomSanitizer, private _linkedInService: LinkedInService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      this.userid = params.get('userid');
      this.getUser(this.userid);

    });
  }

  getUser(userId:string){
    this.manager.getUser(this.userid).subscribe(data => {
      this.submitting = false;
      this.userData = data;
      console.log(data);
      this.setUpUser();
    }, e=>{
      this.submitting = false;
      this.error = JSON.parse(e._body)? JSON.parse(e._body).message :  e.statusText;
      console.log(JSON.parse(e._body));
      this.openDialog();
    });
  }

  openDialog(){
    let dialogRef = this.dialog.open(DialogAskUser, {
       width: '250px',
       data: { error: this.error}
     });

     dialogRef.afterClosed().subscribe(result => {
       if(result){
        this.userid = result;
        console.log(this.userid);
         this.getUser(this.userid);
       }else{
         this.error= "Invalid profileid";
         this.openDialog();
       }
     });
  }

  setUpUser(){
    this.userImage = this.sanitizer.bypassSecurityTrustStyle(`url(${this.userData.person.picture})`);

    for (var key in this.userData) {
      if (this.userData.hasOwnProperty(key) && key !== "stats" && this.userData[key].length>0) {
          this.sections.push(key);
      }
    }
  }

  getPrettyNameSection(key:string){
    if(key ==="achievements"){
      return "Achievements and awards";
    }else if(key === "strengths"){
      return "Strengths and skills";
    }else{
      return this.capitalizeFirstLetter(key);
    }
  }
  capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getElementsInSection(key:string){
    if(this.userData.hasOwnProperty(key) && this.userData[key].length>0){
      return this.userData[key];
    }else{
      return [];
    }
  }

  onClickLink(link:any){
    window.open(link.address, "_blank");
  }

  public subscribeToLogin(){
    //Auth through oAuth2, but still only basic profile ):
    //window.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=781y46u32qk68z&redirect_uri=http%3A%2F%2Flocalhost:4200%2F&state="+this.userid+"&scope=r_fullprofile");
    console.log("here!!");
    this._linkedInService.login().subscribe({
      next: (state) => {
        console.log(state);
        const url = '/people/~:(id,first-name,email-address,last-name,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)?format=json';
      this._linkedInService.raw(url)
        .asObservable()
          .subscribe({
            next: (data) => {
              console.log(data);
              let d = data as any;
              if(d.firstName && d.lastName){
                this.userData.person.name= d.firstName +" "+ d.lastName;
              }
              if(d.headline){
                this.userData.person.professionalHeadline = this.userData.person.professionalHeadline + " / "+ d.headline;
              }
              if(!this.userData.person.picture && d.pictureUrl){
                this.userData.person.picture = d.pictureUrl;
              }
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
            }
          });

        // state will always return true when login completed
      },
    complete: () => {
      // Completed
    }
  });
}

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-ask-user.html',
})
export class DialogAskUser {

  constructor(
    public dialogRef: MatDialogRef<DialogAskUser>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
