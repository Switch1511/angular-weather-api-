import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Weather } from 'src/app/core/interface/weather';
import { ApiRequestService } from 'src/app/core/services/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private apiRequest: ApiRequestService,
  ) { }

  formCity!: FormGroup;
  errorFlag = false

  city: string = "";
  country!: string;
  temp!: number;
  temp_min!: number;
  temp_max!: number;

  ngOnInit(): void {
    this.formCity = new FormGroup({
      city: new FormControl()
    });
  };

  requestAPI(){
    const city = this.formCity.value.city;

    this.apiRequest.getAPI(city).subscribe({
      next: (data: Weather) => {
        this.errorFlag = false
        this.city = data.name
        this.country = data.sys.country
        this.temp = data.main.temp
        this.temp_min = data.main.temp_min
        this.temp_max = data.main.temp_max
        console.log(data)
      },
      error: (error) => {
        console.log(error)
        this.errorFlag = true
      }
    });
  };

}
