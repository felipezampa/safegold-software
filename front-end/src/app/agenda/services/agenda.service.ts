import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor() { }


  getDiaInicio(): Date{
    return new Date('2023-04-17');
  }
  getDiaFim(): Date{
    return  new Date('2023-04-21');
  }
}
