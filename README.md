### Link shortener
You have to create a `.env` in the root folder containing the following:
```
DB_PASSWORD=<db password>
POSTGRES_PASSWORD=<db password>
ADMIN_PASSWORD=<admin password>
MAIL_ADDRESS=<mail address>
MAIL_PASSWORD=<mail password>
```

You also should change the variable in `frontend/.env.local`:
````
NEXT_PUBLIC_NGINX_ADDR=<nginx https address>
```
