import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceNowService } from '../service-now.service';
import { CustomerModel } from '../customer-model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {


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
    equipment: [null]
    // u_street_address: [null, Validators.required],
    // u_address_line_2: [null],
    // u_city: ['Raleigh', Validators.required],
    // u_state: ['NC', Validators.required],
    // u_zip: [null, Validators.compose([
    // Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    // ]
  });

  hasUnitNumber = false;

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

  // states = [
  //   { name: 'Alabama', abbreviation: 'AL' },
  //   { name: 'Alaska', abbreviation: 'AK' },
  //   { name: 'American Samoa', abbreviation: 'AS' },
  //   { name: 'Arizona', abbreviation: 'AZ' },
  //   { name: 'Arkansas', abbreviation: 'AR' },
  //   { name: 'California', abbreviation: 'CA' },
  //   { name: 'Colorado', abbreviation: 'CO' },
  //   { name: 'Connecticut', abbreviation: 'CT' },
  //   { name: 'Delaware', abbreviation: 'DE' },
  //   { name: 'District Of Columbia', abbreviation: 'DC' },
  //   { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
  //   { name: 'Florida', abbreviation: 'FL' },
  //   { name: 'Georgia', abbreviation: 'GA' },
  //   { name: 'Guam', abbreviation: 'GU' },
  //   { name: 'Hawaii', abbreviation: 'HI' },
  //   { name: 'Idaho', abbreviation: 'ID' },
  //   { name: 'Illinois', abbreviation: 'IL' },
  //   { name: 'Indiana', abbreviation: 'IN' },
  //   { name: 'Iowa', abbreviation: 'IA' },
  //   { name: 'Kansas', abbreviation: 'KS' },
  //   { name: 'Kentucky', abbreviation: 'KY' },
  //   { name: 'Louisiana', abbreviation: 'LA' },
  //   { name: 'Maine', abbreviation: 'ME' },
  //   { name: 'Marshall Islands', abbreviation: 'MH' },
  //   { name: 'Maryland', abbreviation: 'MD' },
  //   { name: 'Massachusetts', abbreviation: 'MA' },
  //   { name: 'Michigan', abbreviation: 'MI' },
  //   { name: 'Minnesota', abbreviation: 'MN' },
  //   { name: 'Mississippi', abbreviation: 'MS' },
  //   { name: 'Missouri', abbreviation: 'MO' },
  //   { name: 'Montana', abbreviation: 'MT' },
  //   { name: 'Nebraska', abbreviation: 'NE' },
  //   { name: 'Nevada', abbreviation: 'NV' },
  //   { name: 'New Hampshire', abbreviation: 'NH' },
  //   { name: 'New Jersey', abbreviation: 'NJ' },
  //   { name: 'New Mexico', abbreviation: 'NM' },
  //   { name: 'New York', abbreviation: 'NY' },
  //   { name: 'North Carolina', abbreviation: 'NC' },
  //   { name: 'North Dakota', abbreviation: 'ND' },
  //   { name: 'Northern Mariana Islands', abbreviation: 'MP' },
  //   { name: 'Ohio', abbreviation: 'OH' },
  //   { name: 'Oklahoma', abbreviation: 'OK' },
  //   { name: 'Oregon', abbreviation: 'OR' },
  //   { name: 'Palau', abbreviation: 'PW' },
  //   { name: 'Pennsylvania', abbreviation: 'PA' },
  //   { name: 'Puerto Rico', abbreviation: 'PR' },
  //   { name: 'Rhode Island', abbreviation: 'RI' },
  //   { name: 'South Carolina', abbreviation: 'SC' },
  //   { name: 'South Dakota', abbreviation: 'SD' },
  //   { name: 'Tennessee', abbreviation: 'TN' },
  //   { name: 'Texas', abbreviation: 'TX' },
  //   { name: 'Utah', abbreviation: 'UT' },
  //   { name: 'Vermont', abbreviation: 'VT' },
  //   { name: 'Virgin Islands', abbreviation: 'VI' },
  //   { name: 'Virginia', abbreviation: 'VA' },
  //   { name: 'Washington', abbreviation: 'WA' },
  //   { name: 'West Virginia', abbreviation: 'WV' },
  //   { name: 'Wisconsin', abbreviation: 'WI' },
  //   { name: 'Wyoming', abbreviation: 'WY' }
  // ];
  error: any;
  results: any;
  submitted: boolean;

  constructor(private fb: FormBuilder, private serviceNowService: ServiceNowService) { }

  onSubmit() {

    // console.log('the form = ', this.addressForm);
    this.submitted = true;
    this.serviceNowService.createSNRequest(this.addressForm.value)
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

}
