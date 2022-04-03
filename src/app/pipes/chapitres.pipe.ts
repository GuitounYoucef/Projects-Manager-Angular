import { Pipe, PipeTransform } from '@angular/core';
import { Chapitre } from '../models/Chapitre';

@Pipe({
  name: 'chapitresFilter'
})
export class ChapitresPipe implements PipeTransform {

  transform(chapitres: Chapitre[], searchValue:string): any { 
    if (!chapitres || ! searchValue){
      return chapitres;
    }
    return chapitres.filter(chp => chp.chapitre?.toLocaleLowerCase().includes(searchValue));
  }
}
