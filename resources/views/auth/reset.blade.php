<!-- resources/views/auth/reset.blade.php -->

<!--
<div class="container" style="text-align: center; margin-top:100px;" >


    <img ng-src="{{logo}}" style="width:200px;">
    <div class="resetPasswordForm" style="width:300px; margin:0 auto;">
        <form name="" class="form-signin" method="POST" action="/password/reset">



            <p class="bg-danger" >{{errors.message}}</p>
            <ul class="bg-danger">
                <li  ng-repeat="error in errors">
                    <ul>
                        <li ng-repeat="err in error">{{err}}</li>
                    </ul>
                </li>
            </ul>



            <div class="form-group" ng-class="{'has-error': errors.email}">
                <label class="control-label" for="email">Email</label>
                <input type="email" class="form-control login-form" name="email" ng-model="user.email" id="email" ng-minlength="5" required autofocus>
            </div>

            <div class="form-group"  ng-class="{'has-error': errors.password}">
                <label class="control-label" for="password">Password</label>
                <input type="password" class="form-control login-form" name="password" ng-model="user.password" id="password" ng-minlength="5" required>
            </div>

            <div class="form-group"  ng-class="{'has-error': errors.password_confirmation}">
                <label class="control-label" for="password">Confirm Password</label>
                <input type="password" class="form-control login-form" name="password_confirmation" ng-model="user.password_confirmation" id="password_confirmation" ng-minlength="5" required>
            </div>


            <button type="submit" class="btn btn-lg  btn-block loginButton login-form" ng-disabled="resetPasswordForm.$invalid" >Reset Password</button>


        </form>
    </div>
</div>

-->
<form method="POST" action="/password/reset">
    {!! csrf_field() !!}
    <input type="hidden" name="token" value="{!! $token !!} ">

    @if (count($errors) > 0)
        <ul>
            @foreach ($errors->all() as $error)
                <li>{!!   $error !!}</li>
            @endforeach
        </ul>
    @endif

    <div>
        Email
        <input type="email" name="email" value="{!! old('email') !!}  ">
    </div>

    <div>
        Password
        <input type="password" name="password">
    </div>

    <div>
        Confirm Password
        <input type="password" name="password_confirmation">
    </div>

    <div>
        <button type="submit">
            Reset Password
        </button>
    </div>
</form>