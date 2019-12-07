import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { HtmlToTextPipe } from './pipes/html-to-text.pipe';



@NgModule({
  declarations: [
    ShortenTextPipe,
    HtmlToTextPipe,
  ],
  providers: [
    ShortenTextPipe,
    HtmlToTextPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShortenTextPipe,
    HtmlToTextPipe,
  ]
})
export class SharedModule { }
