import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';
import { Students } from './pages/students/students';
import { Levels } from './pages/levels/levels';
import { Subjects } from './pages/subjects/subjects';
import { Lessons } from './pages/lessons/lessons';
import { Exercises } from './pages/exercises/exercises';
import { Quizzes } from './pages/quizzes/quizzes';
import { Settings } from './pages/settings/settings';
import { Messages } from './pages/messages/messages';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/settings/profile/profile';

const routes: Routes = [
  { 
    path: 'admin', 
    component: Admin,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'students', component: Students },
      { path: 'levels', component: Levels },
      { path: 'subjects', component: Subjects },
      { path: 'lessons', component: Lessons },
      { path: 'exercises', component: Exercises },
      { path: 'quizzes', component: Quizzes },
      { path: 'settings', component: Settings },
      { path: 'messages', component: Messages },
      { path: 'profile', component: Profile },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {} 