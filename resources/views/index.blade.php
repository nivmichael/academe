<?php
header("Access-Control-Allow-Origin: *");
?>


<html ng-app="acadb">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <title>AcadeME Smart & Simple</title>
    <link rel="shortcut icon" href="img/icons/acadeMe.ico">
    {{--jQuery & jQuery-ui--}}

    {!! Html::script('lib/jquery-2.2.3.js') !!}
    {!! Html::script('lib/jquery-ui.min.js') !!}
    <link href='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css' rel='stylesheet'
          type='text/css'>
    {!! Html::script('bower_components/angular/angular.js') !!}

    <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.9.0/loading-bar.min.css'
          type='text/css' media='all'/>
    <script type='text/javascript'
            src='//cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.9.0/loading-bar.min.js'></script>
    {{--CSS Libraries: bootstrap, materialize, angular-materialize--}}


    {!! Html::style('css/bootstrap.min.css') !!}
    {!! Html::style('css/angular-responsive-tables.min.css') !!}
    {!! Html::style('css/ng-img-crop.css') !!}
    {!! Html::style('css/materialize.css') !!}
    {!! Html::style('lib/xeditable/css/xeditable.css') !!}
    {{--{!! Html::script('lib/slider.js') !!}--}}
    {{--Custom CSS--}}

    {{--{!! Html::style('css/statevis.css') !!}--}}
    {!! Html::style('css/rerouting.css') !!}
    {!! Html::style('css/dnd.css') !!}


    {{--{!! Html::style('css/jquery.rateyo.css') !!}--}}


    {{------------------------------------ START OF COMPONENTS (CSS) --------------------------------------------}}

    {{-- EVENTS --}}
    {!! Html::style('components/events-component/events.style.css') !!}
    {{-- EVENT --}}
    {!! Html::style('components/event-component/event.style.css') !!}



    {{---------------------------------- END OF COMPONENTS (CSS)  -------------------------------------------}}


    {{---------------------------------- START OF FONTS  --------------------------------------------}}

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css" type="text/css">

    {{---------------------------------- END OF FONTS  --------------------------------------------}}


</head>


<body ng-cloak>

<div ui-view="sideNav" ng-show="ToolbarModel.IsVisible"></div>
<div ui-view="nav"></div>
<div ui-view="" id="main"></div>
<div ui-view="footer" class=""></div>

</body>

{{-------------------------------- START OF Application Dependencies -------------------------------------------}}



{!! Html::script('lib/angular-ui-router.min.js') !!}
{!! Html::script('lib/ui-extra.js') !!}
{!! Html::script('lib/satellizer.min.js') !!}
{!! Html::script('js/app.js') !!}
{!! Html::script('js/controllers.js') !!}
{{--angular services--}}
{!! Html::script('js/services/resources.js') !!}
{!! Html::script('js/services/account.js') !!}
{!! Html::script('js/services/form.js') !!}
{!! Html::script('js/services/jobseekerJobModal.js') !!}
{!! Html::script('js/services/employerJobModal.js') !!}
{!! Html::script('js/services/newJobModal.js') !!}
{!! Html::script('js/services/dynamics.js') !!}
{!! Html::script('js/services/RolesAndPermissions.js') !!}
{!! Html::script('js/services/job.js') !!}
{!! Html::script('js/services.js') !!}
{{--angular filters--}}
{!! Html::script('js/filters.js') !!}
{{--angular directives--}}
{!! Html::script('js/directives.js') !!}
{{--angular libraries / dependencies / modules--}}
{!! Html::script('/lib/angular-resource.js') !!}
{!! Html::script('/lib/bootstrap.js') !!}
{{--{!! Html::script('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js') !!}--}}
{{--{!! Html::script('lib/ui-bootstrap-tpls.js') !!}--}}
{!! Html::script('node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js') !!}
{!! Html::script('/lib/ui-slider.js') !!}
{!! Html::script('lib/angular-route.js') !!}
{!! Html::script('lib/moment.js')!!}
{!! Html::script('lib/angular_moment.min.js')!!}
{!! Html::script('lib/materialize.js') !!}
{!! Html::script('lib/angular-sanitize.min.js') !!}
{!! Html::script('lib/ng-img-crop.js') !!}
{!! Html::script('lib/ng-file-upload-all.min.js') !!}
{!! Html::script('lib/underscore.js') !!}
{!! Html::script('lib/angular-animate.min.js') !!}
{!! Html::script('lib/toArrayFilter.js') !!}
{!! Html::script('lib/rating/jquery.rateyo.js')!!}
{!! Html::script('lib/rating/angular-rating-yo.js')!!}
{!! Html::script('lib/xeditable/js/xeditable.js')!!}
{!! Html::script('lib/smart-table.min.js') !!}
{!! Html::script('lib/angular-responsive-tables/angular-responsive-tables.min.js') !!}
{!! Html::script('lib/angular-responsive-tables/irDragNDrop.js') !!}
{!! Html::script('lib/sortable.js') !!}
{!! Html::script('lib/ng-sortable.js') !!}

{!! Html::script('lib/angular-permission.js')!!}

{!! Html::script('lib/angular-permission-ui.js')!!}
{!! Html::script('lib/angular-drag-and-drop-lists.min.js') !!}

{{-- TINYMCE --}}
{!! Html::script('bower_components/tinymce-dist/tinymce.min.js') !!}
{!! Html::script('bower_components/angular-ui-tinymce/dist/tinymce.min.js') !!}


{{--angular controllers--}}
{!! Html::script('js/controllers/home.js') !!}
{!! Html::script('js/controllers/login.js') !!}
{!! Html::script('js/controllers/logout.js') !!}
{!! Html::script('js/controllers/navbar.js') !!}
{!! Html::script('js/controllers/profile.js') !!}
{{--{!! Html::script('js/controllers/signup.js') !!}--}}
{!! Html::script('js/controllers/postCtrl.js') !!}
{!! Html::script('js/controllers/steps.js') !!}
{!! Html::script('js/controllers/companyCtrl.js') !!}
{!! Html::script('js/controllers/manager.js') !!}
{!! Html::script('js/controllers/sidenav.js') !!}
{{--{!! Html::script('js/controllers/findajob.js') !!}--}}
{!! Html::script('js/controllers/jobs.js') !!}
{!! Html::script('js/controllers/editForm.js') !!}
{!! Html::script('js/controllers/welcome.js') !!}
{!! Html::script('js/controllers/form.js') !!}
{!! Html::script('js/controllers/matches.js') !!}
{!! Html::script('js/controllers/match.js') !!}
{!! Html::script('lib/angular-filter.js') !!}



{{-- DATA TABLES --}}
{!! Html::style('lib/data-tables/data-tables.min.css') !!}
{!! Html::script('lib/data-tables/data-tables.min.js') !!}


{!! Html::script('bower_components/angular-datatables/dist/angular-datatables.js') !!}
{!! Html::script('bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.min.js') !!}

{!! Html::style('bower_components/angular-datatables/dist/css/angular-datatables.min.css') !!}

{!! Html::script('bower_components/datatables-light-columnfilter/dist/dataTables.lightColumnFilter.js') !!}
{!! Html::script('bower_components/angular-datatables/dist/plugins/light-columnfilter/angular-datatables.light-columnfilter.js') !!}

{{-- END DATA TABLES --}}


{{--------------------------------- END OF Application Dependencies ------------------------------------------}}


{{--------------------------------- START OF CUSTOM STYLE ------------------------------------------}}

{!! Html::style('css/angular-responsive-tables.min.css') !!}
{!! Html::style('css/styles.css') !!}

{{--------------------------------- END OF CUSTOM STYLE ------------------------------------------}}



{{---------------------------------- START OF COMPONENTS (JS) ------------------------------------------}}

{{-- EVENTS --}}
{!! Html::script('components/events-component/events.component.js') !!}
{!! Html::script('components/events-component/events.service.js') !!}

{{-- EVNET --}}
{!! Html::script('components/event-component/event.component.js') !!}

{{-- EDIT EVENT MODAL --}}
{!! Html::script('components/edit-event-invitees-component/edit-event-invitees-modal.js') !!}
{!! Html::script('components/edit-event-invitees-component/edit-event-invitees-modal.service.js') !!}


{{-------------------------------- END OF COMPONENTS (JS)  -------------------------------------------}}

<script>angular.module("acadb").constant("CSRF_TOKEN", '{!! csrf_token() !!}');</script>

<!-- Application Scripts





-->


</html>
