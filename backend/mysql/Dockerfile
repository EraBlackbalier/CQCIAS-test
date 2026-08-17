FROM mysql:8.4

COPY init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE 3306

CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
