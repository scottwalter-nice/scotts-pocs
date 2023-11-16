import { Component } from '@angular/core';
import { ConfigurationService } from 'cxone-client-services-platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng14-webworker';

  constructor() {
    ConfigurationService.instance.setConfiguration({'appContext': 'test'});

    const worker = new Worker(new URL('./scott-worker.worker', import.meta.url));
    worker.postMessage('hello scott');
  }
}

