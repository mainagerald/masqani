import { Component, EventEmitter, input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NewListingPictures } from '../../../model/listing-picture.model';

@Component({
  selector: 'app-picture-step',
  standalone: true,
  imports: [FontAwesomeModule, InputTextModule, ButtonModule],
  templateUrl: './picture-step.component.html',
  styleUrl: './picture-step.component.scss'
})
export class PictureStepComponent {
  pictures = input.required<Array<NewListingPictures>>();
  @Output()
  picturesChange= new EventEmitter<Array<NewListingPictures>>();
  @Output()
  stepValidityChange= new EventEmitter<boolean>();

  extractFileFromTarget(target: EventTarget|null){
    const htmlInputTarget: HTMLInputElement = target as HTMLInputElement;
    if(target===null|| htmlInputTarget.files===null){
      return null;
    }
    return htmlInputTarget.files;
  }
  onUploadNewPicture(target:EventTarget|null){
    const pictureFileList = this.extractFileFromTarget(target);
    if(pictureFileList!=null){
      for(let i =0; i< pictureFileList.length; i++){
        const picture = pictureFileList.item(i);
        if(picture!=null){
          const displayPicture: NewListingPictures = {
            file: picture,
            picUrl: URL.createObjectURL(picture)
          }
          this.pictures().push(displayPicture);
        }
      }
      this.picturesChange.emit(this.pictures());
      this.validatePictures();
    }
  }
  private validatePictures(){
    if(this.pictures().length>=5){
      this.stepValidityChange.emit(true);
    }else{
      this.stepValidityChange.emit(false);
    }
  }
  onTrashPhoto(pictureToDel: NewListingPictures) {
    const idxToDelete = this.pictures().findIndex(picture=>picture.file.name===pictureToDel.file.name);
    this.pictures().splice(idxToDelete, 1);
    this.validatePictures();
    }
}
