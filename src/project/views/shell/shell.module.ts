import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { LoginModalModule } from 'src/project/components/organisms/login-modal/login-modal.module';
import { NavigationModule } from 'src/project/components/organisms/navigation/navigation.module';
import { FooterModule } from 'src/project/components/organisms/footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, LoginModalModule, NavigationModule, FooterModule, RouterModule]
})
export class ShellModule {}
