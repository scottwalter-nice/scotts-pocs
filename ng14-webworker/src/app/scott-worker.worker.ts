/// <reference lib="webworker" />

console.log('RRRRRRRRRR', WorkerGlobalScope);
const global = {};
// importScripts('sockjs.jss');

import { StringUtils, DateUtils, NotificationService, HttpUtils, ConfigurationService } from 'cxone-client-services-platform/index-webworker';

addEventListener('message', ({ data }) => {
  (async () => {

    console.log('worker received message', data, StringUtils.capitalize('hello world'))
    console.log('DateUtils', DateUtils.isSameOrAfter(new Date(), new Date()));
    console.log(NotificationService);
    const response = `worker response to ${data}`;

    ConfigurationService.instance.setConfiguration({'appContext': 'test'});
    const httpResponse  = await HttpUtils.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log('httpResponse', httpResponse);

    NotificationService.instance.createNewSockJS('https://na1-ws.dev.nice-incontact.com', {});
    postMessage(response);

    console.log('STTT', setTimeout);
})();
});
