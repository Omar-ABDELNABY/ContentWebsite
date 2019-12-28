import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  public projectsImages: string[] = [
    '../../../assets/Projects/AlexWest.png',
    '../../../assets/Projects/Allegria.png',
    '../../../assets/Projects/Alrehab.png',
    '../../../assets/Projects/Bellagio.png',
    '../../../assets/Projects/CFC.png',
    '../../../assets/Projects/Dyar.png',
    '../../../assets/Projects/HydePark.png',
    '../../../assets/Projects/Lakeview.png',
    '../../../assets/Projects/Madinaty.png',
    '../../../assets/Projects/Mivida.png',
    '../../../assets/Projects/Palmhills.png',
    '../../../assets/Projects/UptownCairo.png',
  ]
  public partnersImages: string[] = [
    '../../../assets/Partners/Blansol.png',
    '../../../assets/Partners/Ivar.png',
    '../../../assets/Partners/Junkers.png',
    '../../../assets/Partners/Sira.png',
    '../../../assets/Partners/Styleboiler.png',
  ]

}
