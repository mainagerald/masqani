import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { InfoControlComponent } from './info-control/info-control.component';
import { NewListingInfo } from '../../../model/listing.model';


export type Control = "BEDROOMS" | "BATHROOMS";
@Component({
  selector: 'app-info-step',
  standalone: true,
  imports: [FormsModule, ButtonModule, FontAwesomeModule, InfoControlComponent],
  templateUrl: './info-step.component.html',
  styleUrl: './info-step.component.scss'
})
export class InfoStepComponent {

  infos = input.required<NewListingInfo>();
  @Output()
  infoChange=new EventEmitter<NewListingInfo>();
  @Output()
  stepValidityChange=new EventEmitter<boolean>();

  onInfoChange(newValue: number, valueType:Control):void{
    switch(valueType){
      case "BATHROOMS":
        this.infos().bathrooms={value: newValue};
        break;
      case "BEDROOMS":
        this.infos().bedrooms={value: newValue}
        break;
    }
    this.infoChange.emit(this.infos());
    this.stepValidityChange.emit(this.validationRules());
  }
  validationRules(): boolean {
    return this.infos().bathrooms.value>0;
  }

}
