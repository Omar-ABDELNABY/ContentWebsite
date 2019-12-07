import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/common/services/home.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Section } from 'src/app/common/models/section';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { EditSectionComponent } from '../../shared/edit-section/edit-section.component';
import { UiService } from 'src/app/common/services/ui.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private _sections: Section[];
  
  constructor(
    private homeService: HomeService,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private uiService : UiService,
    ) { }

  ngOnInit() {
  }

  get sections(){
    if(this._sections){
      return this._sections;
    }
    this._sections = this.homeService.sections;
    return this._sections;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this._sections, event.previousIndex, event.currentIndex);
  }

  editSection(section: Section){
    const dialogRef: MatDialogRef<EditSectionComponent,Section> = this.dialog.open(EditSectionComponent, {
		  // minWidth: '700px',
		  // minHeight: '500px',
		  data: section
		});
  }

  refresh(){
    this.uiService.spin$.next(true);
    this.homeService.getSections().subscribe(res => {
      this.uiService.spin$.next(false);
      this.homeService.sections = res as Section[];
    }, rej => {
      console.log(rej);
      this.matSnackBar.open(`Can't Connect to Server`,"",{duration: 3000, verticalPosition: 'top'});
      this.uiService.spin$.next(false);
    });
  }
}
