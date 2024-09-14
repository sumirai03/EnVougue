// netlify/functions/subscribe.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const { email } = JSON.parse(event.body);

    const apiEndpoint = 'https://<dc>.api.mailchimp.com/3.0/lists/<list_id>/members/';
    const apiKey = '1845b0b8b9b59ddaf94e5962bc1284ea-us9';

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `apikey ${apiKey}`
        },
        body: JSON.stringify({
            email_address: email,
            status: 'subscribed'
        })
    });

    const data = await response.json();

    if (data.status === 'subscribed') {
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: data.detail })
        };
    }
};