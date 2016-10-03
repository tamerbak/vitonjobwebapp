import {Component, ViewEncapsulation} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {RecruiterService} from '../../providers/recruiter-service';

@Component({
  selector: '[recruiter-list]',
  template: require('./recruiter-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./recruiter-list.scss')],
  directives: [ROUTER_DIRECTIVES],
  providers: [RecruiterService]
})
export class RecruiterList {
  currentUser: any;
  projectTarget: string;
  recruiterList = [];
  constructor(private sharedService: SharedService,
              private router: Router,
              private recruiterService: RecruiterService) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['app/home']);
    }
    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    if (this.projectTarget == "jobyer") {
      this.router.navigate(['app/home']);
    }
  }

  ngOnInit() {
    //if db local contains recruiter list, retrieve it
    this.recruiterList = this.sharedService.getRecruiterList();
    //if db local does not contain recruiter list, retrieve it from server
    if(!this.recruiterList || this.recruiterList.length == 0){
      this.recruiterService.loadRecruiters(this.currentUser.employer.id, this.projectTarget).then((data: any)=>{
        if(data && data.status == "success"){
          this.recruiterList = data.data;
          this.sharedService.setRecruiterList(this.recruiterList);
        }
      });
    }
  }

  goToEditRecruiter(item){
    this.sharedService.setCurrentRecruiter(item);
    if(!this.isEmpty(item)){
      this.router.navigate(['app/recruiter/edit', {obj:'detail'}]);
    }else{
      this.router.navigate(['app/recruiter/edit', {obj:'add'}]);
    }
  }

  deleteRecruiter(item){

  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}
