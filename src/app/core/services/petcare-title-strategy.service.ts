import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class PetCareTitleStrategy extends TitleStrategy {
  private readonly documentTitle = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitle = this.buildTitle(snapshot);
    this.documentTitle.setTitle(routeTitle ? `${routeTitle} | PetCare` : 'PetCare | Atención veterinaria');

    let currentRoute = snapshot.root;
    let description: string | undefined;

    while (currentRoute) {
      const routeDescription = currentRoute.data['description'];
      if (typeof routeDescription === 'string') {
        description = routeDescription;
      }

      if (!currentRoute.firstChild) {
        break;
      }
      currentRoute = currentRoute.firstChild;
    }

    this.meta.updateTag({
      name: 'description',
      content: description ?? 'PetCare: información demostrativa sobre servicios y atención veterinaria para mascotas.'
    });
  }
}
