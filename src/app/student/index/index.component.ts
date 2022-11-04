import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { NumberValueAccessor } from '@angular/forms';
    
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
     
  students: Student[] = [];
  totalMoney: number  = 0;
  totalClasses: number = 0;

  constructor(public studentService: StudentService) { }
    
  ngOnInit(): void {
    this.studentService.getAll().subscribe((data: Student[])=>{
      var currentdate = new Date();
      var auxdate = new Date();
      data.forEach(element => {
        auxdate.setTime(currentdate.getTime() + element.timelapse * 60 * 60 * 1000);
        element.auxHour =  auxdate.getHours() + ':' + (auxdate.getMinutes()<10?'0':'') + auxdate.getMinutes();
        this.totalMoney += element.price * element.quantity;
        this.totalClasses += element.quantity;
      });
      this.students = data;
    })  
  }
    
  deleteStudent(id:number){
    this.studentService.delete(id).subscribe(res => {
         this.students = this.students.filter(item => item.id !== id);
         console.log('Student deleted successfully!');
    })
  }
  
}