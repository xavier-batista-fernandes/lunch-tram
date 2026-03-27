# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

## Steps for developing a CDK application

- Create your project – Create a CDK project using the CDK CLI cdk init command.

- Configure your AWS environment – Configure the AWS environment that you will deploy your application into.

- Bootstrap your AWS environment – Prepare your AWS environment for deployment by bootstrapping it using the CDK CLI cdk bootstrap command.

- Develop your app – Use constructs from the AWS Construct Library to define your Lambda function and Lambda function URL resources.

- Prepare your app for deployment – Use the CDK CLI to build your app and synthesize an AWS CloudFormation template.

- Deploy your app – Use the CDK CLI cdk deploy command to deploy your application and provision your AWS resources.

- Interact with your application – Interact with your deployed Lambda function on AWS by invoking it and receiving a response.

- Modify your app – Modify your Lambda function and deploy to implement your changes.

- Delete your app – Delete all resources that you created by using the CDK CLI cdk destroy command.
