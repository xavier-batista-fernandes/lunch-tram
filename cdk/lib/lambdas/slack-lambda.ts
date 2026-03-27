import * as qs from 'qs';

export const main = async (event: any) => {
    console.log('[slack-lambda] Received event:', JSON.stringify(event, null, 2));

    let parsedBody: any = {};

    if (event.body) {
        const bodyString = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body;

        parsedBody = qs.parse(bodyString);
    }

    console.log('[slack-lambda] Parsed body:', parsedBody);

    return {
        statusCode: 200,
        body: JSON.stringify({
            text: `Hello ${parsedBody.user_name}, lunch command received 🍽️`,
        }),
    };
};
