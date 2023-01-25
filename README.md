# cohabitat.io

## Development

    ng serve --host=0.0.0.0 --disable-host-check

## Deployment

### Staging

Simply:

    ng deploy

Or:

    ng deploy --repo git@github.com:urbaMonde/cohabitat-io-app-staging.git --branch=master --cname=staging.cohabitat.io
    # Configuring options in angular.json fails

Will deploy to https://staging.cohabitat.io/ through https://github.com/urbaMonde/cohabitat-io-app-staging/.

[More about the deployment tool](https://github.com/angular-schule/angular-cli-ghpages)

### Production

Edit `environment.prod.ts` and run:

    ng run cohabitat-io:deploy-production

