import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/service/anime/anime.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.page.html',
  styleUrls: ['./anime-list.page.scss'],
})
export class AnimeListPage implements OnInit {

  animes: Observable<any>;

  constructor(private animeService: AnimeService) {
   }

  ngOnInit() {
    this.animeService.getAnimes().subscribe(
      data => {
        this.animes = data;
      }
    );
  }



}
