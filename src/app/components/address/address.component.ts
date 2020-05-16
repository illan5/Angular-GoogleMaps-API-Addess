import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  totalAngularPackages;
  value = '';
  postcode = '';
  address_formatted = '';
  latitude = 0;
  longitude = 0;

  private api_key = 'Here your API key';

  constructor(private http: HttpClient) { }

  onEnter(value: string) { 
    this.value = value; 
    // Simple GET request with response type <any>
    this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
      this.totalAngularPackages = data.total;
    })
    const address = value.replace(' ', '+');
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${ address }&key=${ this.api_key }`;
    this.http.get<any>(url).subscribe(data => {
      this.totalAngularPackages = data.total;
      console.log(data);
      this.address_formatted = data.results[0].formatted_address;
      this.postcode = data.results[0].address_components.find(element => element.types[0] === 'postal_code').long_name;
      this.longitude = data.results[0].geometry.location.lat;
      this.latitude = data.results[0].geometry.location.lng;
      console.log(this.address_formatted);
      console.log(this.postcode);
      console.log(this.longitude);
      console.log(this.latitude);
    })
    console.log(this.totalAngularPackages)
  }

  ngOnInit(): void {
  }

}
