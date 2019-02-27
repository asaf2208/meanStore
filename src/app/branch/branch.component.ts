import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  constructor() { }

  @Input() name : string;
  @Input() street : string;
  @Input() city : string;

  ngOnInit() {
  }

}
