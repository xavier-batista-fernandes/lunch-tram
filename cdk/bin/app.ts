#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { AppStack } from '../lib/app-stack';

const app = new cdk.App();

console.log('Deploying on the following environment:');
console.log(`Account: ${process.env.CDK_DEFAULT_ACCOUNT}`);
console.log(`Region: ${process.env.CDK_DEFAULT_REGION}`);

new AppStack(app, 'LunchTramStack', {
    /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    // env: { account: '123456789012', region: 'us-east-1' },
});
