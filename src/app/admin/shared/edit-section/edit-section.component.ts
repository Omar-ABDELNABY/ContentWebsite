import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { Section } from 'src/app/common/models/section';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/common/services/home.service';
import { mimeType } from '../../../common/validators/mime-type.validator'

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {
  isEdit: boolean = true;
  imagePreview: string;
  formGroup: FormGroup;
  // formGroup: FormGroup = new FormGroup({
  //   title: new FormControl(),
  //   body: new FormControl()
  // })

  //https://ckeditor.com/old/forums/CKEditor/Complete-list-of-toolbar-items
  // public editorConfig = {
  //   toolbar: [ 
  //     [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'NumberedList', 'BulletedList', 
  //     'Link', 'Unlink', 'Anchor', 'Image', 'Table', 'Styles', 'Format', 'Font', 'FontSize' ]
  //   ],
  // };

  constructor(
    @Inject(MAT_DIALOG_DATA) public section: Section,
    public dialogRef: MatDialogRef<EditSectionComponent>,
    private matSnackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    if (this.section === null){
      this.isEdit = false;
      this.section = new Section();
    }
    this.formGroup = this.formBuilder.group({
      title: [this.section.title, [Validators.maxLength(50)]],
      body: [this.section.body],
      image: [this.section.image, [Validators.required], mimeType],
    });
    console.log('image');
    console.log(this.formGroup.get('image'));
  }

  onImagePicked(event: Event){
    console.log('image');
    console.log(this.formGroup.get('image'));
    const file = (event.target as HTMLInputElement).files[0];
    if(!file){
      return;
    }
    this.formGroup.patchValue({image: file});
    this.formGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };  
    reader.readAsDataURL(file);
  }
  
  save(){
    if (!this.formGroup.valid) {
			return;
    }
    if (this.isEdit){
      this.edit();
      return;
    }
    this.add();
  }

  private edit(){
    this.homeService.editSection(this.section._id, this.formGroup.value, this.formGroup.value.image)
      .subscribe(res => {
        console.log(res);
        const sectionIndex = this.homeService.sections.indexOf(this.section);
        if(sectionIndex >= 0){
          this.homeService.sections.splice(sectionIndex,1,res as Section);
        }
        this.matSnackBar.open("Edited Successfully","",{duration: 3000, verticalPosition: 'top'});
        this.dialogRef.close();
      }, rej => {
        this.matSnackBar.open(`Error:  ${rej['originalError']['error']}`,"",{duration: 3000, verticalPosition: 'top'});
      });
  }

  private add(){
    this.homeService.addSection(this.formGroup.value, this.formGroup.value.image)
    .subscribe(res => {
      console.log(res);
      const section = res as Section;
      this.homeService.sections.push(section);
      this.matSnackBar.open("Added Successfully","",{duration: 3000, verticalPosition: 'top'});
      this.dialogRef.close();
    }, rej => {
      this.matSnackBar.open(`Error:  ${rej['originalError']['error']}`,"",{duration: 3000, verticalPosition: 'top'});
    });
  }
}
