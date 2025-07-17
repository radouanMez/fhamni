import { Component, ViewEncapsulation } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Sidbar } from "../../shared/components/admin/sidbar/sidbar";

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [RouterOutlet, Sidbar, RouterLink],
    templateUrl: './admin.html',
    styleUrl: './admin.css',
    encapsulation: ViewEncapsulation.Emulated
})
export class Admin {

}