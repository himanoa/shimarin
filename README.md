# Shimarin

http://shimar.in 買っちった

## System Dependencies

- gcloud
- yarn
- direnv allow
- Nodejs

## Development

1. Run `yarn && yarn setup`
2. Run `direnv allow`
3. Run `firebase use --add`
4. Run `firebase serve --only functions & yarn start`

## Deployment

1. Run `yarn webpack -p --config webpack.config.prod.js`
2. Run `firebase use --add`
3. Run `firebase deploy`

```
cd functions
gcloud beta functions deploy shimarin --trigger-http --stage-bucket=shimarin_tmp --source=.
```

## Stack

- webpack v3
- React v16
- flow
- eslint
- firebase
- GCP CloudFunctions
- react-redux
- babel
- bulma
- prettier
- redux-saga
- ramda

## License

MIT
