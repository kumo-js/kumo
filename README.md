# Kumo

Kumo, Japanese for "cloud", is a language agnostic tool for deploying stacks to AWS.

In it's most basic form, Kumo is a command line runner ...

## Design principles

### Language agnostic

Kumo is a command line tool; not a library, and certainly not a framework.
You are not creating a "Kumo" application.

### Non-invasive

Kumo does not force a convention or structure on your applications.
Your applications should be free to evolve without fear of lock-in.

### Cloud Formation or not

Whether you love or hate Cloud Formation, Kumo has you covered.

## Comparison with similar tools

### Serverless

We reviewed the Serverless framework in July 2016 and were concerned about the following limitations:

- Lambda-centric. Serverless specifically revolves around AWS Lambda. What if we need to deploy an API Gateway without Lambda?
- No Swagger integration. API Gateway endpoints defined in a non-standard form and coupled to Lambda configuration. 
- Sydney region not yet supported. (Although we could submit a pull request.) 
- No stack hierarchy. No concept of global or shared stacks. (Supposedly available in the upcoming version 0.6).
- No config hierarchy. No concept of services inheriting common config.
- Uses Lambda versions and API Gateway stages, where we prefer complete separation of these resources.
