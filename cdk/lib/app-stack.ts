import * as apigw from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

export class AppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Slack lambda function
        // const slackLambda = new lambda.Function(this, 'SlackLambda', {
        //     runtime: lambda.Runtime.NODEJS_22_X,
        //     handler: 'index.handler',
        //     code: lambda.Code.fromAsset('lambdas/slack'),
        // });

        const slackLambda = new aws_lambda_nodejs.NodejsFunction(this, 'MyLambda', {
            functionName: `${Stack.of(this).stackName}-my-lambda`,
            entry: path.join(__dirname, '../lib/lambda/my-lambda.ts'),
            runtime: aws_lambda.Runtime.NODEJS_20_X,
            handler: 'index.handler',
            logRetention: RetentionDays.ONE_WEEK,
            environment: {
                MY_ENV_VAR: 'hello',
            },
        });

        // Slack lambda integration for API Gateway
        const slackLambdaIntegration = new integrations.HttpLambdaIntegration('SlackLambdaIntegration', slackLambda);

        // HTTP API Gateway
        const api = new apigw.HttpApi(this, 'LunchTram-HttpApi');
        api.addRoutes({
            path: '/lunch',
            methods: [apigw.HttpMethod.GET],
            integration: slackLambdaIntegration,
        });

        // Output the API endpoint
        new CfnOutput(this, 'ApiEndpoint', {
            value: api.apiEndpoint,
        });
    }
}
