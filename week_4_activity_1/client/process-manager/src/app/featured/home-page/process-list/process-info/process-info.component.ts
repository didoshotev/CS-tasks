import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/shared/models/process.model';

@Component({
  selector: 'app-process-info',
  templateUrl: './process-info.component.html',
  styleUrls: ['./process-info.component.scss']
})
export class ProcessInfoComponent implements OnInit {

  process: Process

  constructor() { }

  ngOnInit(): void {
    
  }

}
