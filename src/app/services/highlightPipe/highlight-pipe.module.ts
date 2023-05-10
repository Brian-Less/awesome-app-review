import { NgModule } from '@angular/core';
import { HighlightPipe } from './highlight-pipe.pipe';

@NgModule({
    declarations: [
        HighlightPipe
    ],
    exports     : [
        HighlightPipe
    ]
})
export class HighlightPipeModule
{
}
