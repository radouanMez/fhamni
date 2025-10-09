import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

// import المكونات
import { Admin } from './admin';
import { Dashboard } from './pages/dashboard/dashboard';
import { Students } from './pages/students/students';
import { Levels } from './pages/levels/levels';
import { Subjects } from './pages/subjects/subjects';
import { Lessons } from './pages/lessons/lessons';
import { Exercises } from './pages/exercises/exercises';
import { Quizzes } from './pages/quizzes/quizzes';
import { Settings } from './pages/settings/settings';
import { Messages } from './pages/messages/messages';
import { Profile } from './pages/settings/profile/profile';

const routes: Routes = [
  { 
    path: '', // 🔥 تغيير إلى path فارغ لأن المسار الرئيسي 'admin' معرف في app.routes
    component: Admin,
    canActivate: [AuthGuard],
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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { } // 🔥 تغيير إلى RoutingModule بدل AdminRoutingModule