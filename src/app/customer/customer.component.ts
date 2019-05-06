import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CityworksService } from '../cityworks.service';
import { CityworksAuthResponse } from '../cityworks-auth-response';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  PHONE_REGEX = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
  addressForm = this.fb.group({
    date: [null, Validators.required],
    eventName: [null, Validators.required],
    phone: [null, Validators.compose([Validators.required, Validators.pattern(this.PHONE_REGEX)])],
    description: [null, Validators.maxLength(499)],
    email: [null, Validators.compose([Validators.email, Validators.required])],
    duration: [null, Validators.compose([
      Validators.required, Validators.minLength(1), Validators.maxLength(2)])],
    attendees: [null],
    equipment: [null],
    problemSid: '263816'
  });

  hasUnitNumber = false;
  token: string;


  equipment = [
    { name: 'Pop up Tents', type: ['10’x10’', '10’x15’', '10’x20’'] },
    { name: 'Frame Tent', type: ['15’x15’'] }
    //   Tables: 5' Round, 6’ Rectangular
    //   Folding Chairs
    //   Stage: 6’x 8’ x 2'
    //   P/A System: 500-Watt with wireless mic
    //   Aluminum Bleachers
    //   Generator: 3500 watt, extension cords
    //   Trash Cans: 95 gallon trash roll cart, 95 gallon recycle roll cart, 45 gallon trash can 
  ];

  error: any;
  results: any;
  submitted: boolean;

  constructor(private fb: FormBuilder, private cityworksService: CityworksService) { }

  onSubmit() {
    // console.log('the form = ', this.addressForm);
    this.submitted = true;
    this.cityworksService.createServiceRequest(this.addressForm.value, this.token)
      .subscribe((data) => {
        this.results = data;
        console.log(this.results);
      }, error => {
        this.error = error;
      },
        () => {
          this.submitted = false;
        });
  }

  ngOnInit(): void {
    this.cityworksService.getToken().subscribe(
      (data: CityworksAuthResponse) => {
        this.token = data.Value.Token;
        // use token for createRequest?
      },
      error => this.error = error
    );
  }

}
