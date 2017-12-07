import { Component } from '@angular/core';


type MyIdea = {
  text: string;
  author: string;
  date: string;
}

const ideas: MyIdea[] = [
  {
    "text": "În general focile (Phoca vitulina) au în medie lungimea corpului de 170 cm (la masculi) și de 140 cm (la femele), iar greutatea de 150 respectiv 100 kg. Pe când focile (Halichoerus grypus) au lungimea de 230 cm și ating o greutate de 300 kg. Focile au în general un cap rotunjit, o culoare foarte variată, fiind frecvent de culoare cenușiu închis cu pete negre.",
    "author": "dolgeor",
    "date": "17-04-17"
  },
  {
    "text": "Drink a cup of coffe",
    "author": "ilian",
    "date": "12-07-17"
  }

];




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Drop an Idea';
  ideas = ideas;
}