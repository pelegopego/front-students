import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
   
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  form: FormGroup;
   
  constructor(
    public studentService: StudentService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      scheduled: new FormControl('', Validators.required),
      timelapse: new FormControl('', Validators.required)
    });
  }
   
  get f(){
    return this.form.controls;
  }
    
  submit(){
    this.studentService.create(this.form.value).subscribe(res => {
         console.log('Student created successfully!');
         this.router.navigateByUrl('');
    })
  }
  
}