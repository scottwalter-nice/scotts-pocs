import { ChangeDetectorRef, Component, OnInit, VERSION, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-myform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './myform.component.html',
  styleUrl: './myform.component.scss'
})
export class MyformComponent implements OnInit{
  name = 'Scott';
  signalName = signal('Signal Scott');
  version = VERSION.full;
  modelName = model('Model Scott');

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    // this.modelName.set('Model Scott');
  }

  changeName() {
    this.name = this.name + new Date().getTime();
  }

  changeSignalName() {
    this.signalName.update( value => value + new Date().getTime());
  }

  changeModelName() {
    this.modelName.update( value => value + new Date().getTime());
  }

  oops() {
    console.log('Oops!');
    this.cdRef.detectChanges();
  }
}
