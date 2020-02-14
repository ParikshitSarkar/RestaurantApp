import { Component, OnInit, Inject } from '@angular/core'
import { Leader } from '../../shared/leader'
import { LeaderProvider } from '../providers/leader.service'
declare var globalData:any

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  AboutUsHist:string
  leaders:Leader[]
  errMsg:string

  constructor(
    private leaderService:LeaderProvider,
    @Inject('BaseURL') private BaseURL
  ) { }


  ngOnInit() {
    this.AboutUsHist = globalData.AboutUs_History

    this.leaderService.getLeaders().subscribe(
      leader => this.leaders = leader,
      err => this.errMsg = err
    )
    
  }
}
