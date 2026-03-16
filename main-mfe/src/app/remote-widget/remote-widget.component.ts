import {
  Component,
  Input,
  ViewContainerRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ComponentRef,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-remote-widget',
  standalone: true,
  templateUrl: './remote-widget.component.html',
  styleUrls: ['./remote-widget.component.scss']
})
export class RemoteWidgetComponent implements AfterViewInit, OnDestroy {
  @Input() remoteName = '';
  @Input() exposedModule = './Widget';
  @Input() componentName = 'WidgetComponent';

  @ViewChild('widgetHost', { read: ViewContainerRef })
  widgetHost!: ViewContainerRef;

  loading = true;
  error = false;

  private componentRef?: ComponentRef<unknown>;

  async ngAfterViewInit() {
    try {
      const module = await loadRemoteModule({
        type: 'manifest',
        remoteName: this.remoteName,
        exposedModule: this.exposedModule,
      });

      const component = module[this.componentName];
      this.componentRef = this.widgetHost.createComponent(component);
      this.loading = false;
    } catch (err) {
      console.error(`Failed to load widget from ${this.remoteName}:`, err);
      this.loading = false;
      this.error = true;
    }
  }

  ngOnDestroy() {
    this.componentRef?.destroy();
  }
}
