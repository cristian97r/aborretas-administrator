import { Observable } from 'rxjs';

export interface ChatMessage {
    $key?: string;
    email?: string;
    // userName?: Observable<string>;
   // uncomment when needed
    userName?: string;
    message?: string;
    timeSent?: string;
  }