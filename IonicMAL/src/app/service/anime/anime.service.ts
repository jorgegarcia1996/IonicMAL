import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  apiUrl: string = "https://api.jikan.moe/v3";

  maxAnimeId: number = 14648;

  //Numero de mangas: 32719

  constructor(private httpClient: HttpClient) {  }

  getAnimes(): Observable<any> {
    return this.httpClient.get('assets/data.json');

  }
}
