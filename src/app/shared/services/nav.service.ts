import { Injectable, OnDestroy } from '@angular/core';
import {Subject, BehaviorSubject, fromEvent, Observable} from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {

  constructor(private router: Router, private http: HttpClient) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
    // this.items = this.getData();
  }

  private baseUrl = environment.apiBaseUrl;

  otherMenu: Menu[] = [];
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  // Search Box
  public search = false;

  // Language
  public language = false;

  // Mega Menu
  public megaMenu = false;
  public levelMenu = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen = false;

  // OTHERMENUITEMS: Menu[] = [
  //     { path: this.otherMenu.path, title: this.otherMenu.title, icon: this.otherMenu.icon, type: this.otherMenu.type },
  // ];

  MENUITEMS: Menu[] = [
    // {
    //   headTitle1: 'General',
    // },
    // {
    //   title: 'Dashboards',
    //   icon: 'home',
    //   type: 'sub',
    //   badgeType: 'light-primary',
    //   badgeValue: '5',
    //   active: true,
    //   children: [
    //     { path: '/dashboard/default', title: 'Default', type: 'link' },
    //     { path: '/dashboard/ecommerce', title: 'Ecommerce', type: 'link' },
    //     { path: '', title: 'Online course', type: 'link' },
    //     { path: '/dashboard/crypto', title: 'Crypto', type: 'link' },
    //     { path: '/dashboard/social', title: 'Social', type: 'link' },
    //   ],/dashboard/online-course
    // },
    // {
    //   title: 'Widgets',
    //   icon: 'widget',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     { path: '/widgets/general', title: 'General', type: 'link' },
    //     { path: '/widgets/chart', title: 'Chart', type: 'link' },
    //   ],
    // },
    // {
    //   headTitle1: 'Applications',
    //   headTitle2: 'Ready To Use Apps.',
    // },
    // {
    //   title: 'Project',
    //   icon: 'project',
    //   type: 'sub',
    //   badgeType: 'light-secondary',
    //   badgeValue: 'New',
    //   active: false,
    //   children: [
    //     { path: '/project/list', title: 'Project List', type: 'link' },
    //     { path: '/project/create', title: 'Create New', type: 'link' },
    //   ],
    // },
    // {
    //   path: '/file-manager',
    //   title: 'File Manager',
    //   icon: 'file',
    //   type: 'link',
    // },
    // {
    //   title: 'Ecommerce',
    //   type: 'sub',
    //   icon: 'ecommerce',
    //   active: false,
    //   children: [
    //     { path: '/ecommerce/products', title: 'Product', type: 'link' },
    //     { path: '/ecommerce/product-details', title: 'Product page', type: 'link' },
    //     { path: '/ecommerce/product/list', title: 'Product list', type: 'link' },
    //     { path: '/ecommerce/payment/detail', title: 'Payment Details', type: 'link' },
    //     { path: '/ecommerce/order', title: 'Order History', type: 'link' },
    //     { path: '/ecommerce/invoice', title: 'Invoice', type: 'link' },
    //     { path: '/ecommerce/cart', title: 'Cart', type: 'link' },
    //     { path: '/ecommerce/wish-list', title: 'Wishlist', type: 'link' },
    //     { path: '/ecommerce/checkout', title: 'Checkout', type: 'link' },
    //     { path: '/ecommerce/pricing', title: 'Pricing', type: 'link' },
    //   ],
    // },
    // {
    //   path: '/email',
    //   title: 'Email',
    //   icon: 'email',
    //   type: 'link',
    //   bookmark: true,
    // },
    // {
    //   path: '/chat',
    //   title: 'Chat',
    //   icon: 'chat',
    //   type: 'link',
    //   bookmark: true,
    // },
    {
      title: 'Users',
      icon: 'user',
      type: 'sub',
      active: false,
      children: [
        { path: '/user/team-details', title: 'All Users', type: 'link' },
        { path: '/user/profile', title: 'User Profile', type: 'link' },
        { path: '/user/edit-profile', title: 'Edit Profile', type: 'link' },
      ],
    },
    // { path: '/bookmarks', title: 'Bookmarks', icon: 'bookmark', type: 'link', bookmark: true },
    // { path: '/contacts', title: 'Contact', icon: 'contact', type: 'link', bookmark: true },
    // { path: '/tasks', title: 'Tasks', icon: 'task', type: 'link', bookmark: true },
    { path: '/calender', title: 'Calender', icon: 'calender', bookmark: true },
    // { path: '/social-app', title: 'Social App', icon: 'social', type: 'link' },
    // { path: '/todo', title: 'Todo', icon: 'to-do', type: 'link' },
    // { path: '/search-pages', title: 'Search Result', icon: 'search', type: 'link' },
    // {
    //   headTitle1: 'Forms & Table',
    //   headTitle2: 'Ready To Use Froms & Tables.',
    // },
    // {
    //   title: 'Forms',
    //   icon: 'form',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     {
    //       title: 'Form Controls',
    //       icon: 'file-text',
    //       type: 'sub',
    //       active: false,
    //       children: [
    //         { path: '/form/form-controls/validation', title: 'Form Validation', type: 'link' },
    //         { path: '/form/form-controls/inputs', title: 'Base Inputs', type: 'link' },
    //         { path: '/form/form-controls/checkbox-radio', title: 'Checkbox & Radio', type: 'link' },
    //         { path: '/form/form-controls/input-groups', title: 'Input Groups', type: 'link' },
    //         { path: '/form/form-controls/mega-options', title: 'Mega Options', type: 'link' },
    //       ],
    //     },
    //     {
    //       title: 'Form Widgets',
    //       icon: 'file-text',
    //       type: 'sub',
    //       active: false,
    //       children: [
    //         { path: '/form/form-widgets/touchspin', title: 'Touchspin', type: 'link' },
    //         { path: '/form/form-widgets/ngselect', title: 'Ng-Select', type: 'link' },
    //         { path: '/form/form-widgets/switch', title: 'Switch', type: 'link' },
    //         { path: '/form/form-widgets/clipboard', title: 'Clipboard', type: 'link' },
    //       ],
    //     },
    //     {
    //       title: 'Form Layout',
    //       icon: 'file-text',
    //       type: 'sub',
    //       active: false,
    //       children: [
    //         { path: '/form/form-layout/default-form', title: 'Default Forms', type: 'link' },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Tables',
    //   icon: 'table',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     {
    //       title: 'Bootstrap Tables',
    //       type: 'sub',
    //       active: false,
    //       children: [
    //         { path: '/table/bootstrap-tables/basic', title: 'Basic Table', type: 'link' },
    //         { path: '/table/bootstrap-tables/table-components', title: 'Table components', type: 'link' },
    //       ],
    //     },
    //     {
    //       title: 'Data table',
    //       active: false,
    //       type: 'link',
    //       path: '/table/datatable',
    //     },
    //   ],
    // },
    {
      headTitle1: 'Components',
      headTitle2: 'UI Components & Elements.',
    },
    {
      title: 'Ui-Kits',
      icon: 'ui-kits',
      type: 'sub',
      active: false,
      children: [
        { path: '/ui-kits/avatars', title: 'Avatars', type: 'link' },
        { path: '/ui-kits/breadcrumb', title: 'Breadcrumb', type: 'link' },
        { path: '/ui-kits/grid', title: 'Grid', type: 'link' },
        { path: '/ui-kits/helper-classes', title: 'Helper-Classes', type: 'link' },
        { path: '/ui-kits/list', title: 'List', type: 'link' },
        { path: '/ui-kits/ribbons', title: 'Ribbons', type: 'link' },
        { path: '/ui-kits/shadow', title: 'Shadow', type: 'link' },
        { path: '/ui-kits/spinner', title: 'Spinner', type: 'link' },
        { path: '/ui-kits/tag-n-pills', title: 'Tag and Pills', type: 'link' },
        { path: '/ui-kits/typography', title: 'Typography', type: 'link' },
      ],
    },
    {
      title: 'Bonus UI',
      icon: 'bonus-kit',
      type: 'sub',
      active: false,
      children: [
        {
          title: 'Base',
          icon: 'box',
          type: 'sub',
          children: [
            { path: '/base/accordion', title: 'Accordion', type: 'link' },
            { path: '/base/alert', title: 'Alert', type: 'link' },
            { path: '/base/buttons', title: 'Buttons', type: 'link' },
            { path: '/base/carousel', title: 'Carousel', type: 'link' },
            { path: '/base/collapse', title: 'Collapse', type: 'link' },
            { path: '/base/datepicker', title: 'Datepicker', type: 'link' },
            { path: '/base/dropdown', title: 'Dropdown', type: 'link' },
            { path: '/base/modal', title: 'Modal', type: 'link' },
            { path: '/base/pagination', title: 'Pagination', type: 'link' },
            { path: '/base/popover', title: 'Popover', type: 'link' },
            { path: '/base/progressbar', title: 'Progressbar', type: 'link' },
            { path: '/base/rating', title: 'Rating', type: 'link' },
            { path: '/base/tabset', title: 'Tabset', type: 'link' },
            { path: '/base/timepicker', title: 'Timepicker', type: 'link' },
            { path: '/base/tooltip', title: 'Tooltip', type: 'link' },
            { path: '/base/typeahead', title: 'Typeahead', type: 'link' },
          ],
        },
        {
          title: 'Advance',
          icon: 'folder-plus',
          type: 'sub',
          children: [
            { path: '/advance/scrollable', title: 'Scrollable', type: 'link' },
            { path: '/advance/dropzone', title: 'Dropzone', type: 'link' },
            { path: '/advance/sweetAlert2', title: 'SweetAlert2', type: 'link' },
            { path: '/advance/owl-carousel', title: 'Owl Carousel', type: 'link' },
            { path: '/advance/image-cropper', title: 'Image cropper', type: 'link' },
            { path: '/advance/sticky', title: 'Sticky', type: 'link' },
          ],
        },
      ],
    },
    // {
    //   title: 'Icons',
    //   icon: 'icons',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     { path: '/icons/flag', title: 'Flag icon', type: 'link' },
    //     { path: '/icons/fontawesome', title: 'Fontawesome Icon', type: 'link' },
    //     { path: '/icons/ico', title: 'Ico Icon', type: 'link' },
    //     { path: '/icons/themify', title: 'Themify Icon', type: 'link' },
    //     { path: '/icons/feather', title: 'Feather Icon', type: 'link' },
    //     { path: '/icons/weather', title: 'Weather Icon', type: 'link' },
    //   ],
    // },
    // {
    //   title: 'Buttons',
    //   icon: 'button',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     { path: '/buttons/default', title: 'Default Style', type: 'link' },
    //     { path: '/buttons/flat', title: 'Flat Style', type: 'link' },
    //     { path: '/buttons/edge', title: 'Edge Style', type: 'link' },
    //     { path: '/buttons/raised', title: 'Raised Style', type: 'link' },
    //     { path: '/buttons/group', title: 'Button Group', type: 'link' },
    //   ],
    // },
    // {
    //   title: 'Charts',
    //   icon: 'charts',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     { path: '/chart/apex', title: 'Apex Chart', type: 'link' },
    //     { path: '/chart/google', title: 'Google Chart', type: 'link' },
    //     { path: '/chart/chartjs', title: 'Chartjs Chart', type: 'link' },
    //     { path: '/chart/chartist', title: 'Chartist Chart', type: 'link' },
    //   ],
    // },
    //
    {
      title: 'Security',
      icon: 'layout',
      type: 'sub',
      active: false,
      children: [
        { path: '/security/module', title: 'Module', type: 'link' },
        { path: '/security/menu', title: 'Menu', type: 'link' },
        { path: '/security/permission', title: 'Permission', type: 'link' },
        { path: '/security/user', title: 'User', type: 'link' },
        { path: '/security/role', title: 'Role', type: 'link' },
      ],
    },
    {
      headTitle1: 'Pages',
      headTitle2: 'All Neccesory Pages Added.',
    },
    {
      headTitle1: 'Schooling',
      headTitle2: 'All Neccesory Pages Added.',
    },
    {
      title: 'Configuration',
      icon: 'layout',
      type: 'sub',
      active: false,
      children: [
        { path: '/school/schooling/campus', title: 'Campus', type: 'link' },
        { path: '/school/schooling/building', title: 'Building', type: 'link' },
        { path: '/school/schooling/school', title: 'School', type: 'link' },
        { path: '/school/schooling/room', title: 'Room', type: 'link' },
        { path: '/school/schooling/guardianship', title: 'Guardianship', type: 'link' },
        { path: '/school/schooling/cycle', title: 'Cycle', type: 'link' },
        { path: '/school/schooling/department', title: 'Department', type: 'link' },
        { path: '/school/schooling/program', title: 'Program', type: 'link' },
        { path: '/school/schooling/level', title: 'Level', type: 'link' },
        { path: '/school/schooling/speciality', title: 'Speciality', type: 'link' },
        { path: '/school/schooling/option', title: 'Option', type: 'link' },
        { path: '/school/schooling/training-type', title: 'Training Type', type: 'link' },
        { path: '/school/schooling/class-category', title: 'Class Category', type: 'link' },
        { path: '/school/schooling/school-class', title: 'Class', type: 'link' },
        { path: '/school/schooling/add-edit-school-class', title: 'Class' },
        { path: '/school/schooling/class-room', title: 'Class & Room', type: 'link' },
        { path: '/school/schooling/class-hourly-rate', title: 'Class & Hourly Rate', type: 'link' },
        { path: '/school/schooling/pension-scheme', title: 'Pension Scheme', type: 'link' },
        { path: '/school/schooling/pension-bracket', title: 'Pension Bracket', type: 'link' },
        { path: '/school/schooling/registration-form', title: 'Registration Form', type: 'link' },
        { path: '/school/schooling/cost-area', title: 'Cost Area', type: 'link' },
        { path: '/school/schooling/tuition', title: 'Tuition', type: 'link' },
        { path: '/school/schooling/add-edit-tuition', title: 'Tuition Add' },
      ],
    },
    {
      title: 'Registration',
      icon: 'file',
      type: 'sub',
      active: false,
      children: [
        { path: '/school/schooling/student-registration', title: 'New Student Registration', type: 'link' },
        { path: '/school/schooling/add-edit-student-registration', title: 'Student Registration Add' },
        { path: '/school/schooling/old-student-registration', title: 'Old Student Registration', type: 'link' },
        { path: '/school/schooling/add-edit-old-student-registration', title: 'Old Student Registration Add' },
        { path: '/school/schooling/old-student-registration-per-class', title: 'Registration Per Class', type: 'link' },
        { path: '/school/schooling/add-edit-old-student-registration-per-class', title: 'Old Student Registration Per Class Add' },
        { path: '/school/schooling/school-of-origin', title: 'School Of Origin', type: 'link' },
        { path: '/school/schooling/family', title: 'Family', type: 'link' },
        { path: '/school/schooling/student', title: 'Student', type: 'link' },
        { path: '/school/schooling/add-student', title: 'Student Add' },
        { path: '/school/schooling/change-of-matricule', title: 'Change Matricule', type: 'link' },
        { path: '/school/schooling/change-of-class', title: 'Change Class', type: 'link' },
        { path: '/school/schooling/change-of-regime', title: 'Change Regime', type: 'link' },
        { path: '/school/schooling/change-of-option', title: 'Change Option', type: 'link' },
        { path: '/school/schooling/resignation', title: 'Student Resignation', type: 'link' },
        { path: '/school/schooling/dismissal', title: 'Student Dismissal', type: 'link' },
        { path: '/school/schooling/readmission', title: 'Student Re-Admission', type: 'link' },
      ],
    },
    {
      headTitle1: 'Exam',
      headTitle2: 'All Neccesory Pages Added.',
    },
    {
      title: 'Exam',
      icon: 'layout',
      type: 'sub',
      active: false,
      children: [
        { path: '/school/exam/diploma', title: 'Diploma', type: 'link' },
      ],
    },
    {
      headTitle1: 'Study',
      headTitle2: 'All Neccesory Pages Added.',
    },
    {
      title: 'Configuration',
      icon: 'layout',
      type: 'sub',
      active: false,
      children: [
        { path: '/school/study/module-category', title: 'Module Category', type: 'link' },
        { path: '/school/study/module', title: 'Module', type: 'link' },
        { path: '/school/study/subject-type', title: 'Subject Type', type: 'link' },
        { path: '/school/study/subject', title: 'Subject', type: 'link' },
      ],
    },
    {
      title: 'Program',
      icon: 'layout',
      type: 'sub',
      active: false,
      children: [
        { path: '/school/study/class-program', title: 'Class Program', type: 'link' },
        { path: '/school/study/add-edit-class-program', title: 'Add edit class program', type: 'link' },
        { path: '/school/study/teacher-year', title: 'Teacher Year', type: 'link' },
        { path: '/school/study/class-year', title: 'Class Year', type: 'link' },
        { path: '/school/study/cycle-year', title: 'Cycle Year', type: 'link' },
        { path: '/school/study/speciality-year', title: 'Speciality Year', type: 'link' },
        { path: '/school/study/teacher-course', title: 'Teacher course', type: 'link' },
        { path: '/school/study/student-course', title: 'Student course', type: 'link' },
        { path: '/school/study/teacher-course-registration', title: 'teacher course registration', type: 'link' },
      ],
    },
    {
      title: 'Teacher',
      icon: 'layout',
      type: 'sub',
      active: false,
      children: [
        { path: '/school/study/teacher', title: 'Teacher', type: 'link' },
        { path: '/school/study/add-edit-teacher', title: 'Teacher Add' },
      ],
    },
    {
      title: 'Time Table',
      icon: 'layout',
      type: 'sub',
      active: false,
      children: [
        { path: '/school/study/timetable-period', title: 'Time Table Period', type: 'link' },
        { path: '/school/study/timetable-model', title: 'Time Table model', type: 'link' },
        { path: '/school/study/timetable-model-day', title: 'Time Table model day', type: 'link' },
        { path: '/school/study/timetable-model-day-cell', title: 'Time Table model day cell', type: 'link' },
        { path: '/school/study/add-edit-timetable-model', title: 'Time Table model'},
        { path: '/school/study/list-of-teacher-course-plan', title: 'List-of-teacher-course-plan', type: 'link' },


      ],
    },
    {
      headTitle1: 'Setting',
      headTitle2: 'All Neccesory Pages Added.',
    },
        {
          title: 'Cost',
          icon: 'layout',
          type: 'sub',
          active: false,
          children: [
            { path: '/setting/expense-heading', title: 'Expense Heading', type: 'link' },
          ],
        },
        {
          title: 'Hr',
          icon: 'layout',
          type: 'sub',
          active: false,
          children: [
            { path: '/setting/employment-status', title: 'Employment Status', type: 'link' },
          ],
        },
         {
          title: 'Institution',
          icon: 'layout',
          type: 'sub',
          active: false,
          children: [
            { path: '/setting/manager-type', title: 'Manager Type', type: 'link' },
            { path: '/setting/ministry', title: 'Ministry', type: 'link' },
          ],
        },
        {
          title: 'Location',
          icon: 'maps',
          type: 'sub',
          active: false,
          children: [
            { path: '/setting/country', title: 'Country', type: 'link' },
            { path: '/setting/region', title: 'Region', type: 'link' },
          ],
        },
        {
          title: 'Person',
          icon: 'user',
          type: 'sub',
          active: false,
          children: [
            { path: '/setting/blood-group', title: 'Blood Group', type: 'link' },
            { path: '/setting/civility', title: 'Civility', type: 'link' },
            { path: '/setting/identity-type', title: 'Identity Type', type: 'link' },
            { path: '/setting/marital-status', title: 'Marital Status', type: 'link' },
            { path: '/setting/religion', title: 'Religion', type: 'link' },
            { path: '/setting/rhesus', title: 'Rhesus', type: 'link' },
            { path: '/setting/sex', title: 'Gender', type: 'link' },
          ],
        },
        {
          title: 'School',
          icon: 'learning',
          type: 'sub',
          active: false,
          children: [
            { path: '/setting/diploma-type', title: 'Diploma Type', type: 'link' },
            { path: '/setting/period-type', title: 'Period Type', type: 'link' },
            { path: '/setting/repeating', title: 'Repeating', type: 'link' },
            { path: '/setting/subject-nature', title: 'Subject Nature', type: 'link' },
          ],
        },
        {
          title: 'Other Settings',
          icon: 'learning',
          type: 'sub',
          active: false,
          children: [
            { path: '/setting/day', title: 'Day', type: 'link' },
            { path: '/setting/hourly-unit', title: 'Hourly Unit', type: 'link' },
            { path: '/setting/slice-type', title: 'Slice Type', type: 'link' },
          ],
        },
    // {
    //   title: 'Others',
    //   icon: 'others',
    //   type: 'sub',
    //   children: [
    //     {
    //       title: 'Error Pages',
    //       type: 'sub',
    //       active: false,
    //       children: [
    //         { path: '/error-page/error-400', title: 'Error400', type: 'link' },
    //         { path: '/error-page/error-401', title: 'Error401', type: 'link' },
    //         { path: '/error-page/error-403', title: 'Error403', type: 'link' },
    //         { path: '/error-page/error-404', title: 'Error404', type: 'link' },
    //         { path: '/error-page/error-500', title: 'Error500', type: 'link' },
    //         { path: '/error-page/error-503', title: 'Error503', type: 'link' },
    //       ],
    //     },
    //     {
    //       title: 'Authentication',
    //       type: 'sub',
    //       active: false,
    //       children: [
    //         { path: '/authentication/login/simple', title: 'Login Simple', type: 'link' },
    //         { path: '/authentication/login/image-one', title: 'Login Image 1', type: 'link' },
    //         { path: '/authentication/login/image-two', title: 'Login Image 2', type: 'link' },
    //         { path: '/authentication/login/validation', title: 'Login Validation', type: 'link' },
    //         { path: '/authentication/login/tooltip', title: 'Login Tooltip', type: 'link' },
    //         { path: '/authentication/login/sweetalert', title: 'Login Sweetalert', type: 'link' },
    //         { path: '/authentication/register/simple', title: 'Register Simple', type: 'link' },
    //         { path: '/authentication/register/image-one', title: 'Register Image 1', type: 'link' },
    //         { path: '/authentication/register/image-two', title: 'Register Image 2', type: 'link' },
    //         { path: '/authentication/register/register-wizard', title: 'Register wizard', type: 'link' },
    //         { path: '/authentication/unlock-user', title: 'Unlock User', type: 'link' },
    //         { path: '/authentication/forgot-password', title: 'Forgot Password', type: 'link' },
    //         { path: '/authentication/reset-password', title: 'Reset Password', type: 'link' },
    //       ],
    //     },
    //     {
    //       title: 'Coming Soon',
    //       type: 'sub',
    //       active: false,
    //       children: [
    //         { path: '/coming-soon/simple', title: 'Coming Simple', type: 'link' },
    //         { path: '/coming-soon/simple-with-bg-img', title: 'Coming BG Image', type: 'link' },
    //         { path: '/coming-soon/simple-with-bg-vid', title: 'Coming BG Video', type: 'link' },
    //       ],
    //     },
    //     {
    //       title: 'Email templates',
    //       type: 'sub',
    //       active: false,
    //       children: [
    //         { path: 'http://admin.pixelstrap.com/cuba/theme/basic-template.html', title: 'Basic Email', type: 'extTabLink' },
    //         { path: 'http://admin.pixelstrap.com/cuba/theme/email-header.html', title: 'Basic With Header', type: 'extTabLink' },
    //         { path: 'http://admin.pixelstrap.com/cuba/theme/template-email.html', title: 'Ecomerce Template', type: 'extTabLink' },
    //         { path: 'http://admin.pixelstrap.com/cuba/theme/template-email-2.html', title: 'Email Template 2', type: 'extTabLink' },
    //         { path: 'http://admin.pixelstrap.com/cuba/theme/ecommerce-templates.html', title: 'Ecommerce Email', type: 'extTabLink' },
    //         { path: 'http://admin.pixelstrap.com/cuba/theme/email-order-success.html', title: 'Order Success', type: 'extTabLink' },
    //       ],
    //     },
    //     {
    //       path: '/maintenance',
    //       title: 'Maintenance',
    //       type: 'link',
    //     },
    //   ],
    // },

    // {
    //   headTitle1: 'Miscellaneous',
    //   headTitle2: 'Bouns Pages & Apps.',
    // },
    // {
    //   title: 'Gallery',
    //   icon: 'gallery',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     { path: '/gallery/gallery-grid', title: 'Gallery Grid', type: 'link' },
    //     { path: '/gallery/gallery-desc', title: 'Gallery Grid Desc', type: 'link' },
    //     { path: '/gallery/mesonry', title: 'Masonry Gallery', type: 'link' },
    //     { path: '/gallery/hover', title: 'Hover Effect', type: 'link' },
    //   ],
    // },
    // {
    //   title: 'Blog',
    //   icon: 'blog',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     { path: '/blog/details', title: 'Blog Details', type: 'link' },
    //     { path: '/blog/single', title: 'Single Blog', type: 'link' },
    //     { path: '/blog/add-post', title: 'Add Post', type: 'link' },
    //   ],
    // },
    // { path: '/faq', title: 'FAQ', icon: 'faq', type: 'link', active: false },
    // {
    //   title: 'Job Search',
    //   icon: 'job-search',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     { path: '/job/cards', title: 'Card Layout', type: 'link' },
    //     { path: '/job/list', title: 'List Layout', type: 'link' },
    //     { path: '/job/details/1', title: 'Card with Details', type: 'link' },
    //     { path: '/job/apply/1', title: 'Apply Now', type: 'link' },
    //   ],
    // },
    // {
    //   title: 'Learning',
    //   icon: 'learning',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     { path: '/learning/list', title: 'List', type: 'link' },
    //     { path: '/learning/detailed-course', title: 'Detailed Course', type: 'link' },
    //   ],
    // },
    // {
    //   title: 'Maps',
    //   icon: 'maps',
    //   type: 'sub',
    //   active: false,
    //   children: [
    //     { path: '/map/google', title: 'Google Maps', type: 'link' },
    //     { path: '/map/leaflet', title: 'Leaflet Maps', type: 'link' },
    //   ],
    // },
    // { path: '/editor', title: 'Editor', icon: 'editors', type: 'link' },
    // { path: '/knowledgebase', title: 'Knowledgebase', icon: 'knowledgebase', type: 'link' },
    // { path: '/support-ticket', title: 'Support Ticket', icon: 'support-tickets', type: 'link' },
  ];

  // Array
  //  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
    items = new BehaviorSubject<Menu[]>([]);

    public loadMenu(id: any): Observable<any>{
    return this.http.delete<Menu>(`${this.baseUrl}/user/menus/${id}`);
  }

  //  getData(): BehaviorSubject<Menu[]> {
  //    this.loadMenu(3003).subscribe(menuItems  => {
  //          console.log(menuItems.modules);
  //          const datas = menuItems.modules;
  //          // const type = datas.type;
  //          // const objt: any = {};
  //
  //          this.otherMenu = datas.map((m) => {
  //            // if (type === 'link'){
  //            return {
  //              icon : m.icon,
  //              path : m.path,
  //              title : m.title,
  //              type : m.type,
  //              // bookmark: v.bookmark
  //            };
  //
  //            // objt.icon = v.icon;
  //            // objt.path = v.type;
  //            // objt.title = v.title;
  //            // objt.type = v.type;
  //            // }
  //
  //            // console.log(objt);
  //            // return objt;
  //            // return this.otherMenu;
  //            // this.otherMenu = objt;
  //
  //          });
  //          // return this.otherMenu;
  //        },
  //    );
  //    return new BehaviorSubject<Menu[]>( this.otherMenu);
  // }

  ngOnDestroy() {
    // this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }
}
