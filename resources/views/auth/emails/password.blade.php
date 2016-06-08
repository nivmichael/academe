<!-- resources/views/emails/password.blade.php -->
Hello {!! $user->first_name !!},

You requested a password reset.

Click here to reset your password:

<a href="{!!  url('/#/reset/' . $token) !!}">Reset</a>