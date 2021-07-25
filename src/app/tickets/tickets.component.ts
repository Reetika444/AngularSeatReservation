import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/Services/data.service';
import { Ticket } from './ticket.model';
import { TrainSeats } from './trainSeata.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  data:any;
  total:any=80;
  dataArr:any;
  seatsArray:any=[][12];
  seatstobebooked:any;
  ticket = new Ticket();
  trainSeats = new TrainSeats();
  bookedTicketArray:any;
  availableSeats:any;
  ticketNumber:any;
  alreadyBooked:any=0;
  availableseats:any=80;
  constructor(
    private dataService:DataService
  ) { }

  ngOnInit() {
    this.alreadyBookedSeats();
    localStorage.setItem("seats", JSON.stringify(this.ticket.trainSeats));
    localStorage.setItem("ticketNumber", JSON.stringify(this.ticket.ticketNumber));
    // this.getticketDetails();
  }
  getticketDetails(){
    this.dataService.getData().subscribe(
      res=>{
        this.dataArr = res;
      }
    )
  }

  alreadyBookedSeats(){
    for(var i=0;i<12;i++){
      // var size = size(this.ticket.trainSeats[i]);
      var size =this.ticket.trainSeats[i].length;
      console.log(size);
      for(var j=0;j<size;j++){
        if(this.ticket.trainSeats[i][j] == 1){
          this.alreadyBooked++;
        }
      }

    }
  }

  insertData(){
    console.log(this.ticket);
    //  var colors = ["red","blue","green"];
    //  localStorage.setItem("my_colors", JSON.stringify(colors)); //store colors
    //  var storedColors = JSON.parse(localStorage.getItem("my_colors"));
    //  console.log(storedColors);
     this.dataService.insertData(this.ticket).subscribe(res=>{
      var result = res;
      console.log('inside res');
      console.log(res);
      this.getticketDetails();
    })  
  }
  inserticket(){
    console.log(this.ticket.seatstobebooked);
     //store colors
    // var storedSeats = JSON.parse(localStorage.getItem("seats")); 
    // var ticketNumber=JSON.parse(localStorage.getItem("ticketNumber"));
    // this.ticket.trainSeats=storedSeats;
    // this.ticket.ticketNumber=ticketNumber;
    if(this.ticket.seatstobebooked > 7){
      alert('At a time maximum 7 seats can be booked');
    }else{
     console.log(this.ticket);
     this.dataService.inserticket(this.ticket).subscribe(res=>{
      var result = JSON.parse(res);
      this.ticket.ticketNumber = result.ticketNumber;
      this.bookedTicketArray=result.tickets;
      this.ticket.trainSeats = result.seatsArray;
      localStorage.setItem("seats", JSON.stringify(this.ticket.trainSeats));
      localStorage.setItem("ticketNumber", JSON.stringify(this.ticket.ticketNumber));
      this.alreadyBooked +=  Number(this.ticket.seatstobebooked);
      this.availableseats -= Number(this.ticket.seatstobebooked);
      // this.getticketDetails(); 
    }) 
  }
}
}
