import {Component, ViewEncapsulation, HostListener, OnInit, AfterViewInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NavService } from '../../services/nav.service';
import { LayoutService } from '../../services/layout.service';
import {HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit, OnChanges  {
  public userMenus: any[];

  public iconSidebar;

  @Input()
  public menuItems: Menu[];

  // For Horizontal Menu
  public margin: any = 0;
  public width: any = window.innerWidth;
  public leftArrowNone: boolean = true;
  public rightArrowNone: boolean = false;

  constructor(private router: Router, public navServices: NavService,
              public layout: LayoutService) {

    // this.navServices.items.subscribe(menuItems => {
    //   this.menuItems = menuItems;
    //   console.log(menuItems);
    //   this.router.events.subscribe((event) => {
    //     // console.log(event);
    //     if (event instanceof NavigationEnd) {
    //       menuItems.filter(items => {
    //         console.log(items);
    //         if (items.path === event.url) {
    //           this.setNavActive(items);
    //         }
    //         if (!items.children) { return false; }
    //         items.children.filter(subItems => {
    //           if (subItems.path === event.url) {
    //             this.setNavActive(subItems);
    //           }
    //           if (!subItems.children) { return false; }
    //           subItems.children.filter(subSubItems => {
    //             if (subSubItems.path === event.url) {
    //               this.setNavActive(subSubItems);
    //             }
    //           });
    //         });
    //       });
    //     }
    //   });
    // });



  }

    ngOnInit(): void {
    const moduleId = localStorage.getItem('moduleId');
    this.navServices.loadMenu(moduleId).subscribe(menuItems  => {
          console.log(menuItems.modules);
          const datas = menuItems.modules;
          // const type = datas.type;
          // const objt: any = {};

          this.menuItems = datas.map((m) => {
            // if (type === 'link'){
            return {
              icon : m.icon,
              path : m.path,
              title : m.name,
              type : m.type,
              // bookmark: v.bookmark
              children: m.children?.map((v: any) => {
                return {
                  path : v.path,
                  title : v.name,
                  type : v.type
                };

              })

            };

            // objt.icon = v.icon;
            // objt.path = v.type;
            // objt.title = v.title;
            // objt.type = v.type;
            // }

            // console.log(objt);
            // return objt;
            // return this.otherMenu;
            // this.otherMenu = objt;

          });
        },
    );

    //  this.navServices.getData().subscribe(menuItems => {
    //   this.menuItems = menuItems;
    //   console.log(menuItems);
    //   this.router.events.subscribe((event) => {
    //     // console.log(event);
    //     if (event instanceof NavigationEnd) {
    //       menuItems.filter(items => {
    //         console.log(items);
    //         if (items.path === event.url) {
    //           this.setNavActive(items);
    //         }
    //         if (!items.children) { return false; }
    //         items.children.filter(subItems => {
    //           if (subItems.path === event.url) {
    //             this.setNavActive(subItems);
    //           }
    //           if (!subItems.children) { return false; }
    //           subItems.children.filter(subSubItems => {
    //             if (subSubItems.path === event.url) {
    //               this.setNavActive(subSubItems);
    //             }
    //           });
    //         });
    //       });
    //     }
    //   });
    // });

  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = event.target.innerWidth - 500;
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) { return false; }
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  }


  // For Horizontal Menu
  scrollToLeft() {
    if (this.margin >= -this.width) {
      this.margin = 0;
      this.leftArrowNone = true;
      this.rightArrowNone = false;
    } else {
      this.margin += this.width;
      this.rightArrowNone = false;
    }
  }

  scrollToRight() {
    if (this.margin <= -3051) {
      this.margin = -3464;
      this.leftArrowNone = false;
      this.rightArrowNone = true;
    } else {
      this.margin += -this.width;
      this.leftArrowNone = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    this.menuItems = changes.menuItems.currentValue;
    this.router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        this.menuItems.filter(items => {
          console.log(items);
          if (items.path === event.url) {
            this.setNavActive(items);
          }
          if (!items.children) { return false; }
          items.children.filter(subItems => {
            if (subItems.path === event.url) {
              this.setNavActive(subItems);
            }
            if (!subItems.children) { return false; }
            subItems.children.filter(subSubItems => {
              if (subSubItems.path === event.url) {
                this.setNavActive(subSubItems);
              }
            });
          });
        });
      }
    });
  }

}
