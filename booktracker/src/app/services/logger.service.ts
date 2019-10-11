import { Injectable } from "@angular/core";

@Injectable( )

export class LoggerService {

  constructor() { }

  log(message: string): void {
    const timeString: String = new Date().toLocaleDateString();
    console.log(message + `( ${timeString})`);
  }

  error(message: string): void {
    console.error(`error: ${message}`);
  }

}
