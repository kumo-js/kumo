# Kumo

Kumo, Japanese for "cloud", is a language agnostic tool for deploying stacks to AWS.

In it's most basic form, Kumo is a command line runner ...

Kumo can be enhanced with plugins. See <https://github.com/MYOB-Technology/kumo-plugins>

## Requirements

## Language Agnostic

Because we believe:

- You should choose the right language for the job
- You shouldn't be restricted to any single language
- You should be able to change your language decisions later

## Non-invasive

Because we believe:

- Your application structure should reflect the domain, not the framework
- Your application code shouldn't be coupled to the deployment tool
- You should be able to change your deployment tool later

## CloudFormation (or not)

Developers seems to have a love/hate relationship with CloudFormation.
CloudFormation has the advantage of creating/updating/deleting groups of resources, but has enough gaps to require the use of the SDK.
Therefore we wish to support both CloudFormation, and/or direct use of the SDK.

## Serverless (or not)

We believe:

- The order of precedence of infrastructure decisions should start from a high level of abstraction,
moving toward a lower level of abstraction based on the specific needs of your application. E.g.
Lambda/API Gateway -> PaaS (e.g. Heroku) -> Elastic Beanstalk -> ECS (Docker) -> EC2 -> Own servers
- Your application should be able to leverage resources of various degrees of abstraction
- You should be able to change your infrastructure choices later

Therefore we want to avoid centering the tool around any specific types of resources, e.g. not Lambda-centric, not ECS-centric.

## Isolation

We intend to support the ability to easily maintain multiple environments within an AWS account.
We believe that resources deployed to a particular environment should be isolated,
and not "promoted" across environments using mechanisms like API Gateway stages, and Lambda aliases.
This can cause complexity in the management of environment configuration.

## Similar Tools

### Serverless

We reviewed the Serverless framework in July 2016 and were concerned about the following limitations:

- Lambda-centric. Serverless specifically revolves around AWS Lambda. What if we need to deploy an API Gateway without Lambda?
- No Swagger integration. API Gateway endpoints defined in a non-standard form and coupled to Lambda configuration.
- Sydney region not yet supported. (Although we could submit a pull request.)
- No stack hierarchy. No concept of global or shared stacks. (Supposedly available in the upcoming version 0.6).
- No config hierarchy. No concept of services inheriting common config.
- Uses Lambda versions and API Gateway stages, where we prefer complete separation of these resources.

### Apex

Tool to build, deploy, and manage AWS Lambda functions.

Apex:
- Centred around lambda
- Supports GoLang
- Uses raw sdk calls to create resources
- Seems support some kind integration with terraform for creating other aws resources but does not seem very stable at this stage (based on github issues)

### Gordon

Gordon is a tool to create, wire and deploy AWS Lambdas using CloudFormation

- Used to create / deploy lambda functions and API Gateway
- Whilst not exactly centred around AWS Lambda, only supports API Gateway integrations to Lambda
- Does not concern itself with management of other dependent AWS resources (eg. S3 Buckets, DynamoDB tables etc)
- 100% CloudFormation
- 100% isolation between environments (does not use Lambda versions and API Gateway stages)

## Usage
```
kumo <action> <args>
```
### Built-in actions
```
kumo install    installs all configured plugins
```
### Global args (available to all actions):
```
--cwd           sets the current working directory
--verbose       enables more detailed logging
```
