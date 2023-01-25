import { Component, OnInit, Input } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-object-text-long',
  templateUrl: './object-text-long.component.html',
  styleUrls: ['./object-text-long.component.sass']
})
export class ObjectTextLongComponent implements OnInit {

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
      var localEntry = this.texts.find(x => x.type === 'long' && x.lang === this.translate.currentLang)
      if (localEntry) {
        // Localized exists
        this.text = localEntry.text;
      } else {
        // Localized does not exist, take any
        var long = this.texts.find(x => x.type === 'long');
        if (long) {
          this.text = long.text
        }
      }
    }
  }

  @Input() texts: any;

}
