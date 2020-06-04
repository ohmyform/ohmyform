# Load Balancing Config

## Required changes

`MAILER_URI` should be set to allow emails to be sent.

Further you have to setup a Load Balancer (more in the Configuration section)

## Configuration

for this setup it is important to have either an 
ingress server that does load balancing on paths
or to expose the api on a different host.

If you expose the api on a different host do not forget
to change the API_HOST env variable on the ui 
container to route the requests properly.


# AWS Cloudfront Ingress

both ui and api would run behind a load balancer.

the default path should then be routed to the ui container
and the /graphql path to the api container.

