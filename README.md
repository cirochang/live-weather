# Live Weather

> A Live RealTime Weather of tokyo created by Ciro Chang. (Also you can view the weather of next 5 days).
The live video is recording by this youtube channel: https://www.youtube.com/watch?v=JYBpu1OyP0c

## Dependency

To run this project you need to run the weather-proxy-api too.

I needed to create this webserver to access the API of openweathermap.org because this API not has CORS.
So the flow of requests is:

live-weather -> weather-proxy-api -> openweathermap.org (API that contains the weather metadatas)

To get the weather-proxy-api access:
https://github.com/cirochang/weather-proxy-api

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```
