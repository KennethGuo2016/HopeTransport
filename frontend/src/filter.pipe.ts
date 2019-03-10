import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class Filter implements PipeTransform {

  transform(pipeData, pipeModifier): any {
    if (pipeData.length === 0 || pipeModifier === '') {
      return pipeData;
    }
    const resultArray = [];
    for (const item of pipeData) {
      if (item['name'].toLowerCase().includes(pipeModifier.toLowerCase())) {
        resultArray.push(item);
      }
    } 
    return resultArray;
  }
}


