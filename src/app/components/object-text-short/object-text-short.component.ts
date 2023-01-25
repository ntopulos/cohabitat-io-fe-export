import { Component, OnInit, Input } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-object-text-short',
  templateUrl: './object-text-short.component.html',
  styleUrls: ['./object-text-short.component.sass']
})
export class ObjectTextShortComponent implements OnInit {

  text: string;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.populate();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.populate();
    });
  }

  private populate() {
    // Get text
    if(this.texts){

      var localEntry = this.texts.find(x => x.type === 'short' && x.lang === this.translate.currentLang)
      if (localEntry) {
        // Localized exists
        this.text = localEntry.text;
      } else {
        // Localized does not exist, take any
        var short = this.texts.find(x => x.type === 'short').text;
        if (short) {
          this.text = short;
        }
      }
    }
  }

  @Input() texts: any;

}
