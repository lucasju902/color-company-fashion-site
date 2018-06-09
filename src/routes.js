angular
  .module('app')
  .config(routesConfig);

function routesConfig($stateProvider, $urlRouterProvider) {
  // $locationProvider.html5Mode(true);
  // .hashPrefix('#');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('aboutPage', {
      url: '/',
      component: 'aboutPage'
    });

  $stateProvider
    .state('login', {
      url: '/login',
      component: 'loginComponent'
    });

  $stateProvider
    .state('speakingEngagements', {
      url: '/speaking-engagements',
      component: 'speakingEngagementsComponent'
    });

  $stateProvider
    .state('press', {
      url: '/press',
      component: 'pressComponent'
    });

  $stateProvider
    .state('members', {
      url: '/members',
      component: 'membersComponent'
    });

  $stateProvider
    .state('verticalCoverage', {
      url: '/vertical-coverage',
      component: 'verticalCoverageComponent'
    });

  $stateProvider
    .state('membership', {
      url: '/membership',
      component: 'membershipComponent',
      params: {
        scrollTo: false
      }
    });

  $stateProvider
    .state('colorEmotion', {
      url: '/color-emotion',
      component: 'colorEmotionComponent',
      protected: true

    });

  $stateProvider
    .state('partners', {
      url: '/data-partners',
      component: 'partnersComponent'
    });

  $stateProvider
    .state('reports', {
      url: '/reports',
      component: 'reportsComponent',
      protected: true
    });

  $stateProvider
    .state('reportsDetails', {
      url: '/reports/:id',
      component: 'reportsDetailsComponent',
      protected: true
    });

  $stateProvider
    .state('dailyInsights', {
      url: '/daily-insights',
      component: 'dailyInsightsComponent'
    });

  $stateProvider
    .state('infographics', {
      url: '/infographics',
      component: 'infographicsComponent'
    });

  $stateProvider
    .state('infographicsDetails', {
      url: '/infographics/:id',
      component: 'infographicsDetailsComponent'
    });

  $stateProvider
    .state('customizedInfographics', {
      url: '/customized-infographics',
      component: 'customizedInfographicsComponent',
      protected: true
    });

  $stateProvider
    .state('membersAnalytics', {
      url: '/members-analytics',
      component: 'membersAnalyticsComponent',
      protected: true
    });

  $stateProvider
    .state('publicationSchedule', {
      url: '/publication-schedule',
      component: 'publicationScheduleComponent'
    });
  $stateProvider
    .state('goodReads', {
      url: '/good-reads',
      component: 'goodReadsComponent'
    });

  $stateProvider
    .state('goodReadsDetails', {
      url: '/good-reads/:id',
      component: 'goodReadsDetailsComponent'
    });

  $stateProvider
    .state('teachingMaterials', {
      url: '/teaching-materials',
      component: 'teachingMaterialsComponent'
    });

  $stateProvider
    .state('teachingDetailsMaterials', {
      url: '/teaching-materials/:id',
      component: 'teachingMaterialsDetailsComponent'
    });

  $stateProvider
    .state('courses', {
      url: '/courses',
      component: 'coursesComponent'
    });

  $stateProvider
    .state('coursesDetails', {
      url: '/courses/:id',
      component: 'coursesDetailsComponent'
    });

  $stateProvider
    .state('privacy', {
      url: '/privacy-policy',
      component: 'privacyComponent'
    });

  $stateProvider
    .state('terms', {
      url: '/terms',
      component: 'termsComponent'
    });

  $stateProvider
    .state('contact', {
      url: '/contact',
      component: 'contactUsComponent'
    });

  $stateProvider
    .state('test', {
      url: '/test',
      component: 'test'
    });

  $stateProvider
    .state('productInquiry', {
      url: '/product-inquiry',
      component: 'inquiriesComponent'
    });

  $stateProvider
    .state('partnershipInquire', {
      url: '/partnership-inquire',
      component: 'inquiriesComponent'
    });

  $stateProvider
    .state('educationInquire', {
      url: '/education-inquire',
      component: 'inquiriesComponent'
    });

  $stateProvider
    .state('detailedPage', {
      url: '/detailed-page',
      component: 'detailedComponent',
      protected: true
    });

  $stateProvider
    .state('recover', {
      url: '/recover',
      component: 'recoverComponent'
    });

  // Fashion Dashboard
  $stateProvider
    .state('fashion', {
      url: '/fashion',
      templateUrl: 'app/components/dashboards/fashion/fashion.tmpl.html',
      protected: true
    });

  $stateProvider
    .state('seasonFashion', {
      parent: 'fashion',
      url: '/season',
      templateUrl: 'app/components/dashboards/fashion/season/season.tmpl.html'
    });

  $stateProvider
    .state('colorFashion', {
      parent: 'fashion',
      url: '/color',
      templateUrl: 'app/components/dashboards/fashion/color/color.tmpl.html'
    });

  $stateProvider
    .state('yearFashion', {
      parent: 'fashion',
      url: '/year',
      templateUrl: 'app/components/dashboards/fashion/year/year.tmpl.html'
    });

  $stateProvider
    .state('designerFashion', {
      parent: 'fashion',
      url: '/designer',
      templateUrl: 'app/components/dashboards/fashion/designer/designer.tmpl.html'
    });

  $stateProvider
    .state('regionFashion', {
      parent: 'fashion',
      url: '/region',
      templateUrl: 'app/components/dashboards/fashion/region/region.tmpl.html'
    });

  $stateProvider
    .state('cityFashion', {
      parent: 'fashion',
      url: '/city',
      templateUrl: 'app/components/dashboards/fashion/city/city.tmpl.html'
    });

  $stateProvider
    .state('categoryFashion', {
      parent: 'fashion',
      url: '/category',
      templateUrl: 'app/components/dashboards/fashion/category/category.tmpl.html'
    });

  // Auto Dashboard
  $stateProvider
    .state('auto', {
      url: '/auto',
      templateUrl: 'app/components/dashboards/auto/auto.tmpl.html',
      protected: true
    });

  $stateProvider
    .state('brandAuto', {
      parent: 'auto',
      url: '/brand',
      templateUrl: 'app/components/dashboards/auto/brand/brand.tmpl.html'
    });

  $stateProvider
    .state('modelAuto', {
      parent: 'auto',
      url: '/model',
      templateUrl: 'app/components/dashboards/auto/model/model.tmpl.html'
    });

  $stateProvider
    .state('yearAuto', {
      parent: 'auto',
      url: '/year',
      templateUrl: 'app/components/dashboards/auto/year/year.tmpl.html'
    });

  $stateProvider
    .state('colorAuto', {
      parent: 'auto',
      url: '/color',
      templateUrl: 'app/components/dashboards/auto/color/color.tmpl.html'
    });

  // Legal Dashboard
  $stateProvider
    .state('legal', {
      url: '/legal',
      templateUrl: 'app/components/dashboards/legal/legal.tmpl.html',
      protected: true
    });

  $stateProvider
    .state('ownerLegal', {
      parent: 'legal',
      url: '/owner',
      templateUrl: 'app/components/dashboards/legal/owner/owner.tmpl.html'
    });

  $stateProvider
    .state('yearLegal', {
      parent: 'legal',
      url: '/year',
      templateUrl: 'app/components/dashboards/legal/year/year.tmpl.html'
    });

  $stateProvider
    .state('colorLegal', {
      parent: 'legal',
      url: '/color',
      templateUrl: 'app/components/dashboards/legal/color/color.tmpl.html'
    });

  $stateProvider
    .state('productLegal', {
      parent: 'legal',
      url: '/product',
      templateUrl: 'app/components/dashboards/legal/product/product.tmpl.html'
    });

  // Brand Dashboard
  $stateProvider
    .state('branding', {
      url: '/branding',
      templateUrl: 'app/components/dashboards/branding/branding.tmpl.html',
      protected: true
    });

  $stateProvider
    .state('brandBranding', {
      parent: 'branding',
      url: '/brand',
      templateUrl: 'app/components/dashboards/branding/brand/brand.tmpl.html'
    });

  $stateProvider
    .state('industryBranding', {
      parent: 'branding',
      url: '/industry',
      templateUrl: 'app/components/dashboards/branding/industry/industry.tmpl.html'
    });

  $stateProvider
    .state('colorBranding', {
      parent: 'branding',
      url: '/color',
      templateUrl: 'app/components/dashboards/branding/color/color.tmpl.html'
    });

  $stateProvider
    .state('attributeBranding', {
      parent: 'branding',
      url: '/attribute',
      templateUrl: 'app/components/dashboards/branding/attribute/attribute.tmpl.html'
    });

  $stateProvider
    .state('countryBranding', {
      parent: 'branding',
      url: '/country',
      templateUrl: 'app/components/dashboards/branding/country/country.tmpl.html'
    });

  $stateProvider
    .state('thank-you', {
      url: '/thank-you/:parFrom',
      component: 'thankYouComponent'
    });

  $stateProvider
    .state('password-recover', {
      url: '/password-recover/:token',
      component: 'passwordRecoverComponent'
    });

  $stateProvider
    .state('staffLogin', {
      url: '/staff-login',
      component: 'staffLoginComponent'
    });
  $stateProvider
    .state('profile', {
      url: '/profile',
      component: 'profileComponent'
    });
  $stateProvider
    .state('cart-page', {
      url: '/cart/:wayBack',
      component: 'cartPageComponent'
    });
  $stateProvider
    .state('cart-checkout', {
      url: '/cart-checkout',
      component: 'cartCheckoutComponent'
    });
  $stateProvider
    .state('download-excerpt', {
      url: '/download-excerpt/:type/:id',
      component: 'downloadExcerptPageComponent'
    });
}

