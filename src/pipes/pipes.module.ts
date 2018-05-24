import { NgModule } from '@angular/core';
import { TrimHtmlPipe } from './trim-html.pipe';
import { TruncatePipe } from './truncate.pipe';
import { YoutubeEmbedUrlPipe } from './youtube-embed-url.pipe';
import { VimeoEmbedUrlPipe } from './vimeo-embed-url.pipe';
import { LocalDatePipe } from './local-date.pipe';
import { HoursMinutesSecondsPipe } from './hours-minutes-seconds.pipe';
import { RoundPipe } from './round.pipe';

@NgModule({
	declarations: [
		TruncatePipe,
		TrimHtmlPipe,
		YoutubeEmbedUrlPipe,
		VimeoEmbedUrlPipe,
		LocalDatePipe,
		HoursMinutesSecondsPipe,
		RoundPipe
	],
	exports: [
		TruncatePipe,
		TrimHtmlPipe,
		YoutubeEmbedUrlPipe,
		VimeoEmbedUrlPipe,
		LocalDatePipe,
		HoursMinutesSecondsPipe,
		RoundPipe
	]
})
export class PipesModule {

}