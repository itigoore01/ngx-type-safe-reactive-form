#!/bin/bash -eu
npm test -- ngx-type-safe-reactive-form --watch false --browsers ChromeHeadless
npm run build -- ngx-type-safe-reactive-form
cp ./README.md ./dist/ngx-type-safe-reactive-form
cp ./LICENSE ./dist/ngx-type-safe-reactive-form
