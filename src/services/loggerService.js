import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init(){
  Sentry.init({
    dsn: "https://02cea8c2fb8442f5bad0b1880b5c926d@o1140148.ingest.sentry.io/6197078",
    integrations: [new BrowserTracing()],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

function log(msg){
  Sentry.captureException(msg);
}

export default { init, log }

