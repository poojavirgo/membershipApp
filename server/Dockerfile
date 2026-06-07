FROM golang:1.23-alpine AS build
WORKDIR /src
COPY go.mod ./
COPY go.sum* ./
COPY . .
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/api ./cmd/api

FROM alpine:3.20
RUN adduser -D -u 10001 appuser
COPY --from=build /bin/api /bin/api
USER appuser
EXPOSE 8080
ENTRYPOINT ["/bin/api"]