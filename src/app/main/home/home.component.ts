import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/common/services/home.service';
import { TopicUnit } from 'src/app/common/models/topic-unit';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _sections;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }
  get sections() {
    return this._sections || this.getTopics();
  }

  public getTopics(){
      this._sections = this.homeService.getUnits();
  }

}
