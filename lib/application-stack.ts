import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import type { Construct } from "constructs";

export class ApplicationStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new lambda.Function(this, "CreateLunchPollLambda", {
            functionName: "lunch-tram-lambda-create-lunch-poll",
            description: "Lambda to process a lunch poll request.",
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: "create-lunch-poll.handler",
            code: lambda.Code.fromAsset("lambda"),
            timeout: cdk.Duration.minutes(15),
        });
    }
}
