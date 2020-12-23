# $kolplattformen API

This is a try to reverse engineer Skolplattformens backend to a more consistant and secure experience for developers to create apps that can help parents, kids and teachers to be more productive.

## Demo
Try the demo at: [https://skolplattformen-api.snowflake.cash](https://skolplattformen-api.snowflake.cash)

## Get Started
Clone the repo. 

    cd packages/api
    npm i
    npm start
    
Now navigate to localhost:9000.

## Hosting
We use Kubernetes and Skaffold for easy hosting. Just connect to a cluster and run

    skaffold run

It will build and push a deployment and ingress specified in the k8s folder.

## Road Ahead: From one monolith to very specialized apps.
Our idea is to use this API as a starting point to be able to create specialized apps for each user role starting with parents/guardians. Each user/role can get their own specialized apps that is designed for their need. This is the way.

## Disclaimer
This initiative is started by frustrated parents and we have no affiliation with Stockholm Stad. We just want our newsletters a little bit easier and register sick-leave a little bit more convenient.

If you are offended by this initiative, please don't - we come in peas.

# Contributors
- Christian Landgren, Iteam
- Johan Öbrink
- Erik Hellman


## License

MIT
