# Roles

## unauthenticated

every request is unauthenticated unless an `Authorization` 
header with a valid `JWT Bearer` token is provided.

## user

any new registration is a user per default, they can only see their 
responses and do not have access to forms.

## admin

an admin can create forms and edit their own forms. They do not 
have access to forms from other users.

## superuser

a superuser can create and edit any form on the platform as well as
modify any user

they can also grant a user admin or superuser access, they cannot revoke
their own superuser role
