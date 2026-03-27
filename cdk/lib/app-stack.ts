import { HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as path from 'path';

export class AppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Slack lambda integration for API Gateway
        const slackLambda = new NodejsFunction(this, 'LunchTram-SlackLambda', {
            runtime: Runtime.NODEJS_LATEST,
            entry: path.join(__dirname, 'lambdas/slack-lambda.ts'),
            handler: 'main',
        });
        const slackLambdaIntegration = new HttpLambdaIntegration('LunchTram-SlackLambdaIntegration', slackLambda);

        // // HTTP API Gateway
        const httpApi = new HttpApi(this, 'LunchTram-HttpApi');

        httpApi.addRoutes({
            path: '/lunch',
            methods: [HttpMethod.GET, HttpMethod.POST],
            integration: slackLambdaIntegration,
        });

        // Output the API endpoint
        new CfnOutput(this, 'ApiEndpoint', {
            value: httpApi.apiEndpoint,
        });
    }
}
