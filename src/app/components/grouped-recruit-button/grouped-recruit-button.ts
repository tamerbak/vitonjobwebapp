import {Component, EventEmitter, Input} from "@angular/core";
import {SharedService} from "../../../providers/shared.service";
import {RecruitmentService} from "../../../providers/recruitment-service";
import {Utils} from "../../utils/utils";

@Component({
  selector: 'grouped-recruit-button',
  template: require('./grouped-recruit-button.html'),
  styles: [require('./grouped-recruit-button.scss')],
  providers: [RecruitmentService]
})

export class GroupedRecruitButton{
  @Input()
  jobyer: any;

  currentUser: any;
  projectTarget: string;
  obj: string;
  isRecruited: boolean = false;

  constructor(private sharedService: SharedService,
              private recruitmentService: RecruitmentService) {
    this.currentUser = this.sharedService.getCurrentUser();
  }

  ngOnInit(){
    this.verifyRecord();
  }

  verifyRecord(){
    let o = this.sharedService.getCurrentOffer();
    let offerId = (Utils.isEmpty(o) ? '' : o.idOffer);
    let jobyerId = (Utils.isEmpty(this.jobyer.id) ? this.jobyer.idJobyer : this.jobyer.id);
    this.recruitmentService.getGroupedRecruitment(this.currentUser.id, jobyerId, this.jobyer.idJob, offerId).then((data:any) => {
      if (data && data.status == "success" && data.data && data.data.length > 0) {
        this.isRecruited = true;
      }else{
        this.isRecruited = false;
      }
    });
  }

  recruitJobyer() {
    if (this.currentUser && this.currentUser.employer) {
      let jobyerId = (Utils.isEmpty(this.jobyer.id) ? this.jobyer.idJobyer : this.jobyer.id);
      if (!this.isRecruited) {
        let o = this.sharedService.getCurrentOffer();
        let offerId = (Utils.isEmpty(o) ? '' : o.idOffer);
        this.recruitmentService.insertGroupedRecruitment(this.currentUser.id, jobyerId, this.jobyer.idJob, offerId).then((data:any) => {
          if (data && data.status == "success") {
            this.isRecruited = true;
          }
        });
      }else{
        this.recruitmentService.deleteGroupedRecruitment(this.currentUser.id, jobyerId, this.jobyer.idJob).then((data:any) => {
          if (data && data.status == "success") {
            this.isRecruited = false;
          }
        });
      }
    }
  }
}
