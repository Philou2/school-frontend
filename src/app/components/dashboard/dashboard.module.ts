import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartistModule } from 'ng-chartist';
import { NgChartsModule } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';

import { DefaultComponent } from './default/default.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { WelcomeComponent } from './default/welcome/welcome.component';
import { StatusComponent } from './default/status/status.component';
import { OverallBalanceComponent } from './default/overall-balance/overall-balance.component';
import { RecentOrdersComponent } from './default/recent-orders/recent-orders.component';
import { ActivityComponent } from './default/activity/activity.component';
import { RecentSalesComponent } from './default/recent-sales/recent-sales.component';
import { TimelineComponent } from './default/timeline/timeline.component';
import { PurchaseAccountComponent } from './default/purchase-account/purchase-account.component';
import { TotalUsersComponent } from './default/total-users/total-users.component';
import { FollowersGrowthComponent } from './default/followers-growth/followers-growth.component';
import { PaperNoteComponent } from './default/paper-note/paper-note.component';
import { OrdersProfitComponent } from './default/orders-profit/orders-profit.component';
import { OrdersComponent } from './default/orders-profit/orders/orders.component';
import { ProductStatusChartBoxComponent } from './default/product-status-chart-box/product-status-chart-box.component';
import { LeftContentComponent } from './ecommerce/left-content/left-content.component';
import { RightTopCategoriesComponent } from './ecommerce/right-top-categories/right-top-categories.component';
import { OrderBoardComponent } from './ecommerce/left-content/order-board/order-board.component';
import { ValuableCustomerComponent } from './ecommerce/left-content/valuable-customer/valuable-customer.component';
import { MonthlyOrderComponent } from './ecommerce/left-content/monthly-order/monthly-order.component';
import { MonthlyProfitsComponent } from './ecommerce/left-content/monthly-profits/monthly-profits.component';
import { OrderOverviewComponent } from './ecommerce/left-content/order-overview/order-overview.component';
import { DiscoverProComponent } from './ecommerce/left-content/discover-pro/discover-pro.component';
import { VisitorsComponent } from './ecommerce/left-content/visitors/visitors.component';
import { ProfitComponent } from './default/orders-profit/profit/profit.component';
import { RecentOrdersTableComponent } from './ecommerce/left-content/recent-orders-table/recent-orders-table.component';
import { ProductTableComponent } from './ecommerce/left-content/recent-orders-table/product-table/product-table.component';
import { RightChartDataComponent } from './ecommerce/left-content/order-overview/right-chart-data/right-chart-data.component';
import { OnlineCourseComponent } from './online-course/online-course.component';
import { HelloNameComponent } from './online-course/hello-name/hello-name.component';
import { TodayProgressComponent } from './online-course/today-progress/today-progress.component';
import { MoreDetailsComponent } from './online-course/more-details/more-details.component';
import { CalendarComponent } from './online-course/calendar/calendar.component';
import { LearningOverviewComponent } from './online-course/learning-overview/learning-overview.component';
import { ActivityHoursComponent } from './online-course/activity-hours/activity-hours.component';
import { UpcomingEventsComponent } from './online-course/upcoming-events/upcoming-events.component';
import { UpcomingScheduleComponent } from './online-course/upcoming-schedule/upcoming-schedule.component';
import { MyCourseComponent } from './online-course/my-course/my-course.component';
import { ActiveLessonsComponent } from './online-course/active-lessons/active-lessons.component';
import { CryptoComponent } from './crypto/crypto.component';
import { CryptoLeftContentComponent } from './crypto/crypto-left-content/crypto-left-content.component';
import { CryptoMiddleContentComponent } from './crypto/crypto-middle-content/crypto-middle-content.component';
import { CryptoRightContentComponent } from './crypto/crypto-right-content/crypto-right-content.component';
import { AverageComponent } from './crypto/crypto-left-content/average/average.component';
import { TransactionsComponent } from './crypto/crypto-left-content/transactions/transactions.component';
import { CoinComponent } from './crypto/crypto-middle-content/coin/coin.component';
import { MarketGraphComponent } from './crypto/crypto-middle-content/market-graph/market-graph.component';
import { CurrenciesComponent } from './crypto/crypto-middle-content/currencies/currencies.component';
import { BuyCoinsComponent } from './crypto/crypto-middle-content/buy-coins/buy-coins.component';
import { SellCoinsComponent } from './crypto/crypto-middle-content/sell-coins/sell-coins.component';
import { BalanceProfileComponent } from './crypto/crypto-right-content/balance-profile/balance-profile.component';
import { PortfolioComponent } from './crypto/crypto-right-content/portfolio/portfolio.component';
import { ActivitiesComponent } from './crypto/crypto-right-content/activities/activities.component';
import { SocialComponent } from './social/social.component';
import { SocialUserProfileComponent } from './social/social-user-profile/social-user-profile.component';
import { MobileApplicationComponent } from './social/mobile-application/mobile-application.component';
import { SocialMediaComponent } from './social/social-media/social-media.component';
import { SocialMediaChartComponent } from './social/social-media/social-media-chart/social-media-chart.component';
import { SubscribersComponent } from './social/social-media/subscribers/subscribers.component';
import { ClicksChartsComponent } from './social/social-media/clicks-charts/clicks-charts.component';
import { FollowerGenderComponent } from './social/follower-gender/follower-gender.component';
import { CampaignComponent } from './social/campaign/campaign.component';
import { AllCampaignsComponent } from './social/all-campaigns/all-campaigns.component';
import { ViewsComponent } from './social/views/views.component';
import { CoursesComponent } from './online-course/hello-name/courses/courses.component';
import { SaleStatusComponent } from './ecommerce/left-content/order-board/sale-status/sale-status.component';
import {LoadingModuleComponent} from './loading-module/loading-module.component';
import {ModuleBoardComponent} from './loading-module/left-content/module-board/module-board.component';
import {LoadingLeftContentComponent} from './loading-module/left-content/loading-left-content.component';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {StudyDashboardComponent} from './study-dashboard/study-dashboard.component';
import {ProgressionComponent} from './study-dashboard/progression/progression.component';
import {AssignCourseComponent} from './study-dashboard/assign-course/assign-course.component';
import {ActiveCoursesComponent} from './study-dashboard/active-courses/active-courses.component';
import {SettingDashboardComponent} from './setting-dashboard/setting-dashboard.component';
import {SettingConfigurationComponent} from './setting-dashboard/setting-configuration/setting-configuration.component';
import {SecurityDashboardComponent} from './security-dashboard/security-dashboard.component';
import {SchoolDashboardComponent} from './school-dashboard/school-dashboard.component';
import {SchoolConfigurationComponent} from './school-dashboard/school-configuration/school-configuration.component';
import {ExamsDashboardComponent} from './exams-dashboard/exams-dashboard.component';
import {ExamsConfigurationComponent} from './exams-dashboard/exams-configuration/exams-configuration.component';
import {SecurityConfigurationComponent} from './security-dashboard/security-configuration/security-configuration.component';
import {ClassExamComponent} from './exams-dashboard/class-exam/class-exam.component';
import {TeacherDashboardComponent} from './teacher-dashboard/teacher-dashboard.component';
import {TeacherConfigurationComponent} from './teacher-dashboard/teacher-configuration/teacher-configuration.component';
import {ActiveLessonsStudyComponent} from './online-course-study/active-lessons-study/active-lessons-study.component';
import {ActivityHoursStudyComponent} from './online-course-study/activity-hours-study/activity-hours-study.component';
import {CalendarStudyComponent} from './online-course-study/calendar-study/calendar-study.component';
import {
  CoursesCompletedStudyComponent
} from './online-course-study/hello-name-study/courses-completed-study/courses-completed-study.component';
import {CoursesStudyComponent} from './online-course-study/hello-name-study/courses-study/courses-study.component';
import {HelloNameStudyComponent} from './online-course-study/hello-name-study/hello-name-study.component';
import {CoursesStudyTwoComponent} from './online-course-study/hello-name-study/courses-study-two/courses-study-two.component';
import {LearningOverviewStudyComponent} from './online-course-study/learning-overview-study/learning-overview-study.component';
import {MoreDetailsStudyComponent} from './online-course-study/more-details-study/more-details-study.component';
import {MyCourseStudyComponent} from './online-course-study/my-course-study/my-course-study.component';
import {TodayProgressStudyComponent} from './online-course-study/today-progress-study/today-progress-study.component';
import {UpcomingEventsStudyComponent} from './online-course-study/upcoming-events-study/upcoming-events-study.component';
import {OnlineCourseStudyComponent} from './online-course-study/online-course-study.component';
import {ActiveLessonsStudentComponent} from './student-dashboard/active-lessons-student/active-lessons-student.component';
import {ActivityHoursStudentComponent} from './student-dashboard/activity-hours-student/activity-hours-student.component';
import {CalendarStudentComponent} from './student-dashboard/calendar-student/calendar-student.component';
import {HelloNameStudentComponent} from './student-dashboard/hello-name-student/hello-name-student.component';
import {CoursesStudentTwoComponent} from './student-dashboard/hello-name-student/courses-student-two/courses-student-two.component';
import {CoursesStudentComponent} from './student-dashboard/hello-name-student/courses-student/courses-student.component';
import {
  CoursesCompletedStudentComponent
} from './student-dashboard/hello-name-student/courses-completed-student/courses-completed-student.component';
import {LearningOverviewStudentComponent} from './student-dashboard/learning-overview-student/learning-overview-student.component';
import {MoreDetailsStudentComponent} from './student-dashboard/more-details-student/more-details-student.component';
import {MyCourseStudentComponent} from './student-dashboard/my-course-student/my-course-student.component';
import {TodayProgressStudentComponent} from './student-dashboard/today-progress-student/today-progress-student.component';
import {UpcomingEventsStudentComponent} from './student-dashboard/upcoming-events-student/upcoming-events-student.component';
import {UpcomingScheduleStudentComponent} from './student-dashboard/upcoming-schedule-student/upcoming-schedule-student.component';
import {StudentDashboardComponent} from './student-dashboard/student-dashboard.component';
import {UpcomingScheduleStudyComponent} from './online-course-study/upcoming-schedule-study/upcoming-schedule-study.component';
@NgModule({
  declarations: [
    DefaultComponent,
    EcommerceComponent,
    LoadingModuleComponent,
    WelcomeComponent,
    StatusComponent,
    OverallBalanceComponent,
    RecentOrdersComponent,
    ActivityComponent,
    RecentSalesComponent,
    TimelineComponent,
    PurchaseAccountComponent,
    TotalUsersComponent,
    FollowersGrowthComponent,
    PaperNoteComponent,
    OrdersProfitComponent,
    ProfitComponent,
    OrdersComponent,
    ProductStatusChartBoxComponent,
    LeftContentComponent,
    LoadingLeftContentComponent,
    RightTopCategoriesComponent,
    OrderBoardComponent,
    ModuleBoardComponent,
    ValuableCustomerComponent,
    MonthlyOrderComponent,
    MonthlyProfitsComponent,
    OrderOverviewComponent,
    DiscoverProComponent,
    VisitorsComponent,
    RecentOrdersTableComponent,
    ProductTableComponent,
    RightChartDataComponent,
    OnlineCourseComponent,
    HelloNameComponent,
    TodayProgressComponent,
    MoreDetailsComponent,
    CalendarComponent,
    LearningOverviewComponent,
    ActivityHoursComponent,
    UpcomingEventsComponent,
    UpcomingScheduleComponent,
    MyCourseComponent,
    ActiveLessonsComponent,
    CryptoComponent,
    CryptoLeftContentComponent,
    CryptoMiddleContentComponent,
    CryptoRightContentComponent,
    AverageComponent,
    TransactionsComponent,
    CoinComponent,
    MarketGraphComponent,
    CurrenciesComponent,
    BuyCoinsComponent,
    SellCoinsComponent,
    BalanceProfileComponent,
    PortfolioComponent,
    ActivitiesComponent,
    SocialComponent,
    SocialUserProfileComponent,
    MobileApplicationComponent,
    SocialMediaComponent,
    SocialMediaChartComponent,
    SubscribersComponent,
    ClicksChartsComponent,
    FollowerGenderComponent,
    CampaignComponent,
    AllCampaignsComponent,
    ViewsComponent,
    CoursesComponent,
    SaleStatusComponent,
    StudyDashboardComponent,
    ProgressionComponent,
    AssignCourseComponent,
    ActiveCoursesComponent,
    SettingDashboardComponent,
    SettingConfigurationComponent,
    SecurityDashboardComponent,
    SchoolDashboardComponent,
    SchoolConfigurationComponent,
    ExamsDashboardComponent,
    ExamsConfigurationComponent,
    SecurityConfigurationComponent,
    ClassExamComponent,
    TeacherDashboardComponent,
    TeacherConfigurationComponent,
    ActiveLessonsStudyComponent,
    ActivityHoursStudyComponent,
    CalendarStudyComponent,
    CoursesCompletedStudyComponent,
    CoursesStudyComponent,
    HelloNameStudyComponent,
    CoursesStudyTwoComponent,
    LearningOverviewStudyComponent,
    MoreDetailsStudyComponent,
    MyCourseStudyComponent,
    TodayProgressStudyComponent,
    UpcomingEventsStudyComponent,
    OnlineCourseStudyComponent,
    UpcomingScheduleStudyComponent,
    ActiveLessonsStudentComponent,
    ActivityHoursStudentComponent,
    CalendarStudentComponent,
    HelloNameStudentComponent,
    CoursesStudentTwoComponent,
    CoursesStudentComponent,
    CoursesCompletedStudentComponent,
    LearningOverviewStudentComponent,
    MoreDetailsStudentComponent,
    MyCourseStudentComponent,
    TodayProgressStudentComponent,
    UpcomingEventsStudentComponent,
    UpcomingScheduleStudentComponent,
    StudentDashboardComponent
  ],
  imports: [CommonModule,
    ChartistModule,
    CarouselModule,
    NgChartsModule,
    NgApexchartsModule,
    SharedModule,
    GoogleMapsModule,
    NgbModule,
    FormsModule,
    DashboardRoutingModule,

    // for HttpClient use:
    LoadingBarHttpClientModule,
    // for Router use:
    LoadingBarRouterModule,
    // for Core use:
    LoadingBarModule
  ],
  exports: [
    CoinComponent,
    ProductStatusChartBoxComponent,
    CoursesComponent,
    SocialMediaChartComponent,
    OrdersComponent,
    ProfitComponent,
    SaleStatusComponent,
    BalanceProfileComponent,
    CalendarComponent,
    AverageComponent,
    TotalUsersComponent,
  ]
})
export class DashboardModule {}
