import { Component, EventEmitter, input, model, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-info-control',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './info-control.component.html',
  styleUrl: './info-control.component.scss',
})
export class InfoControlComponent {
  title = input.required<string>();
  value = model.required<number>();
  seperator = input<boolean>(true);
  minValue = input<number>(0);

  @Output()
  valueChange = new EventEmitter<number>();

  onIncrement(): void {
    const newValue = this.value() + 1;
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }
  onDecrement(): void {
    const newValue = this.value() - 1;
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }
}
