# Hong Kong Top News PWA #

This is a Progressive Web Application to fetch Top News in Hong Kong. News results are from [News API](https://newsapi.org/).
To cache third party responses and image assets, `workbox-build` was useed to override the default service worker generated by `create-react-app`, which will be run when building for production environment. In other words, service worker does not work in development mode. Please build the project to test.

You will need to register a News API key and add it to `.env` file's `REACT_APP_NEWS_API_KEY` variable.

## Node version ##
* Developed using Node.js 10.x

## Development ##
* `npm run dev`

## Build production ##
* `npm run build`

## To-do ##
* Background sync
* Notification when there is update after background sync ([Reference](https://pwa-workshop.js.org/5-background-sync/#background-synchronization))
* Refresh button on app bar (i.e. Implement Redux store)
* Detect for device offline and inform user they are reading cached results
* Bookmark function (i.e. Local Storage)
