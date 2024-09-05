# Node Express App

## Overview

This is a Node.js application built with Express. It serves as a clone of Google Drive, providing a web-based file storage and sharing solution with a user-friendly interface and seamless integration of cloud functionalities.

## Features

-   User authentication and authorization
-   File upload, list,rename and delete capabilities
-   Real-time collaboration on documents
-   Integration with AWS for file storage
-   Responsive design for mobile and desktop access

## Prerequisites

-   Node.js (v14 or higher)
-   npm (Node Package Manager)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=5000                       # The port on which the server will run
    MONGO_URI="your_mongo_uri"      # Connection string for MongoDB database
    CLIENT_URL="http://localhost:3000"  # URL for the client application
    AWS_ACCESS_KEY_ID="your_aws_access_key_id"  # AWS access key for authentication
    AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"  # AWS secret key for authentication
    AWS_BUCKET_NAME="your_aws_bucket_name"  # Name of the S3 bucket for file storage
    AWS_REGION="your_aws_region"   # AWS region where the S3 bucket is located
    SESSION_SECRET="your_session_secret"  # Secret key for session management
    GOOGLE_CLIENT_ID="your_google_client_id"  # Client ID for Google OAuth
    GOOGLE_CLIENT_SECRET="your_google_client_secret"  # Client secret for Google OAuth
    ```

## Usage

To start the application, run:

```bash
npm install
```

## License

This project is licensed under the MIT License.
