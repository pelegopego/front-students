import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student';
import { FormGroup, FormControl, Validators} from '@angular/forms';
   
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    
  id: number;
  student: Student;
  form: FormGroup;
  
  constructor(
    public studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['studentId'];
    this.studentService.find(this.id).subscribe((data: Student)=>{
      this.student = data;
    });
    
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
    this.studentService.update(this.id, this.form.value).subscribe(res => {
         console.log('Student updated successfully!');
         this.router.navigateByUrl('');
    })
  }
   
}