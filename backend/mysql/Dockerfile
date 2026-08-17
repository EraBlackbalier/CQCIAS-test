FROM golang:1.26.6-trixie AS gosu-build

ARG GOSU_COMMIT=6456aaa0f3c854d199d0f037f068eb97515b7513

ENV CGO_ENABLED=0

RUN git init /src \
    && git -C /src fetch --depth 1 https://github.com/tianon/gosu.git "${GOSU_COMMIT}" \
    && git -C /src checkout --detach FETCH_HEAD

WORKDIR /src

RUN go build -trimpath -ldflags="-d -w" -o /gosu .

FROM mysql:8.4

USER root

RUN microdnf remove -y mysql-shell \
    && microdnf clean all \
    && rm -rf /var/cache/dnf

COPY --from=gosu-build --chmod=0755 /gosu /usr/local/bin/gosu

RUN gosu --version && gosu nobody true

COPY init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE 3306

CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
