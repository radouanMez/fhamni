import { Component } from '@angular/core';
import { LessonCard } from './../../../../shared/components/lesson-card/lesson-card';

@Component({
  selector: 'app-subjects',
  standalone: true, 
  imports: [LessonCard],
  templateUrl: './subjects.html',
  styleUrl: './subjects.css'
})
export class Subjects {

}
