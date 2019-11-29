import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  constructor() {}

  ngOnInit() {}
}
