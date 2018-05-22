import {Component} from "@angular/core";
import { App } from "ionic-angular";

// Providers
import { ParseProvider } from '../../providers/parse/parse';
import { AuthProvider } from '../../providers/auth/auth';

// Pages
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  newScore = { playerName: null, score: null };
  gameScores = [];


  static ICONS: string[] = ["camera-retro", "heartbeat", "cutlery"]
  static COLORS: string[] = ["primary", "secondary", "danger", "light"]
  static SIZES: string[] = ["lg", "2x", "3x", "4x", "5x"]

  iconIdx: number = 0;
  colorIdx: number = 0;
  sizeIdx: number = 0;

  get icon(): string {
    return HomePage.ICONS[this.iconIdx];
  }

  get color(): string {
    return HomePage.COLORS[this.colorIdx];
  }

  get size(): string {
    return HomePage.SIZES[this.sizeIdx];
  }

  constructor(private parseProvider: ParseProvider, private auth: AuthProvider,  private app: App) {
    this.listScores();
    
    setInterval(() => {
      if (++this.iconIdx == HomePage.ICONS.length) {
        this.iconIdx = 0;
      }
      if (++this.colorIdx == HomePage.COLORS.length) {
        this.colorIdx = 0;
      }
      if (++this.sizeIdx == HomePage.SIZES.length) {
        this.sizeIdx = 0;
      }
    }, 1000);
  }

  public listScores(): Promise<any> {
    let offset = this.gameScores.length;
    let limit = 10;
    return this.parseProvider.getGameScores(offset, limit).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        this.gameScores.push(object);
      }
    }, (error) => {
      console.log(error);
    });
  }

  public postGameScore() {
    this.parseProvider.addGameScore(this.newScore).then((gameScore) => {
      this.gameScores.push(gameScore);
      this.newScore.playerName = null;
      this.newScore.score = null;
    }, (error) => {
      console.log(error);
      alert('Error adding score.');
    });
  }

  public signout() {
    this.auth.signout().subscribe(() => {
      this.app.getRootNav().setRoot(SigninPage);
    });
  }
}
