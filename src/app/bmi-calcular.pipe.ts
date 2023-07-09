import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bmiCalcular'
})
export class BmiCalcularPipe implements PipeTransform {

  transform(bmiCalcular: any): any {
    if(bmiCalcular <16.0){
      return "Severally Underweight"
    }
    else if (bmiCalcular >= 16.0 && bmiCalcular <= 18.4) {
      return 'Underweight';
    }
    else if (bmiCalcular >= 18.5 && bmiCalcular <= 24.9) {
      return 'Normal';
    }
    else if (bmiCalcular >= 25.0 && bmiCalcular < 29.9) {
      return 'Overweight';
    } else if (bmiCalcular >= 30.0 && bmiCalcular <=34.9) {
      return 'Moderately Obese';
    }
    else if (bmiCalcular >= 35.0 && bmiCalcular <=39.9) {
      return 'Severely Obese';
    }
    else if (bmiCalcular >= 40.0){
      return 'Morbidly Obese';
    }
  }

}
