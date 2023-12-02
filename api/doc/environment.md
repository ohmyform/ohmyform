# Environment Variables

| Name                         | Default Value              | Description                                                                           |
|------------------------------|----------------------------|---------------------------------------------------------------------------------------|
| DISABLE_INSTALLATION_METRICS | *not set*                  | Per default installations are [publishing](./installation.metrics.md) their existence |
| SECRET_KEY                   | `changeMe`                 | JWT Secret for authentication                                                         |
| CLI                          | *automatically*            | activates pretty print for log output                                                 |
| NODE_ENV                     | `production`               |                                                                                       |
| HIDE_CONTRIB                 | `false`                    | decide if backlings to ohmyform should be added                                       |
| SIGNUP_DISABLED              | `false`                    | if users can sign up                                                                  |
| LOGIN_NOTE                   | *not set*                  | Info box on top of login screen                                                       | 
| LOCALES_PATH                 | *not set*                  | Path to translated elementes in backend like emails                                   |
| LOCALE                       | `en`                       | Default Locale                                                                        |
| BASE_URL                     | `http://localhost`         | Url to Frontend root                                                                  |
| USER_CONFIRM_PATH            | `/confirm?token={{token}}` | Path to confirm user                                                                  |

## Default Account

*username and email are unique on an instance*

| Name           | Default Value        | Description                         |
|----------------|----------------------|-------------------------------------|
| CREATE_ADMIN   | `false`              | if `true` will create a super admin |
| ADMIN_USERNAME | `root`               | username for the default admin user |
| ADMIN_EMAIL    | `admin@ohmyform.com` | email to send notifications         |
| ADMIN_PASSWORD | `root`               | password for user                   |

## Mailing

| Name        | Default Value                   | Description                                                                       |
|-------------|---------------------------------|-----------------------------------------------------------------------------------|
| MAILER_URI  | `smtp://localhost:1025`         | [Mail Connection](https://nodemailer.com/smtp/)                                   |
| MAILER_FROM | `OhMyForm <no-reply@localhost>` | Default From path, make sure that your mail server supports the given from addres |

## Database Variables

| Name                  | Default Value          | Description                                                                                                                                |
|-----------------------|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| DATABASE_DRIVER       | `sqlite`               | database driver, either `sqlite` or `postgres`                                                                                             |
| DATABASE_URL          | `sqlite://data.sqlite` | url in the format `TYPE://USER:PASS@HOST:PORT/NAME?EXTRA` ([read more](https://typeorm.io/#/connection-options/common-connection-options)) |
| DATABASE_TABLE_PREFIX | *empty*                | prefix all tables if used within same database as other applications.                                                                      |
| DATABASE_LOGGING      | `false`                | if `true` all db interactions will be logged to stdout                                                                                     |
| DATABASE_MIGRATE      | `true`                 | can be used in load balanced environments to only allow one container to perform migrations / manually execute migrations                  |
| DATABASE_SSL          | `false`                | if `true` will require ssl database connection                                                                                             |
| REDIS_HOST            | *not set*              | required in multinode environments                                                                                                         |
| REDIS_PORT            | `6379`                 | port for redis                                                                                                                             |
