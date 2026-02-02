import * as cdk from "aws-cdk-lib";
import { ApplicationStack } from "../lib/application-stack";

const app = new cdk.App();

console.log("Account:", process.env.CDK_DEFAULT_ACCOUNT);
console.log("Region:", process.env.CDK_DEFAULT_REGION);

new ApplicationStack(app, "LunchTramApplicationStack", {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});
