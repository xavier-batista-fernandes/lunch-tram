# 🍽️ Lunch Tram

A simple web application that makes it easier to track how many people are going to lunch.

## Running the Application Locally

Follow these steps to get Lunch Tram running on your machine:

1. **Set up environment variables**
    Create a `.env` file based on `.env.template`.
    Fill in the required values. 
<br />

2. **Install dependencies**
    ```
   npm install
   ```
<br />

3. **Start the development server**
    ```
    npm run dev
    ```
    Runs by default on port `3000`.
    Watches for changes in the source code.
<br />

4. **Expose your local server**
    ```
    ngrok http 3000
    ```
    Using `ngrok` will make your app accessible from the internet.
<br />

5. **Configure your Slack app**
    Update the app to point to the public address provided by `ngrok`.
<br />

6. **Add required permissions to your Slack app**
    The slack app needs to have the following permissions to be able to work properly:
        - `commands` 
        - `chat:write`
        - `channels:read`
        - `reactions:read`
        - `reactions:write`