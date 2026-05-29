pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            // Add this to ensure the container has access to host resources
            args '-u root --privileged' 
        }
    }

    environment {
        OPENAI_API_KEY = credentials('openai-api-key')
    }

    stages {
        stage('Install') {
            steps {
                // Navigate to your specific subdirectory before running npm
                dir('ui-tests/curlmecrazy') {
                    sh 'npm install'
                }
            }
        }
        stage('Execute & Heal') {
            steps {
                // Navigate to the subdirectory where the healer script lives
                dir('ui-tests/curlmecrazy') {
                    sh 'npm run healer'
                }
            }
        }
    }
}