pipeline {

    agent any

    parameters {
        string(name: 'TARGET_SERVICE', defaultValue: '', description: 'Name of the service to test')
        string(name: 'IMAGE_TAG', defaultValue: '', description: 'Docker image tag to test')
    }

    environment {
        REGISTRY = "ghcr.io"
        REGISTRY_ORG = "rbrcloud"
        SERVICE_IMAGE = "ghcr.io/${env.REGISTRY_ORG}/${params.TARGET_SERVICE}:${params.IMAGE_TAG}"
    }

    stages {
        stage('Cleanup & Setup') {
            steps {
                sh "docker compose -f docker-compose.yml down -v --remove-orphans || true"
            }
        }

        stage('Spin up ephemeral environment') {
            steps {
                script {
                    // Map for service names to environment variable names in the docker-compose file
                    def serviceMap = [
                        "apex-order-srvc": "ORDER_SRVC_IMAGE",
                        "apex-order-execution-srvc": "ORDER_EXECUTION_SRVC_IMAGE",
                        "apex-portfolio-srvc": "PORTFOLIO_SRVC_IMAGE",
                    ]
                    echo "Launching ${params.TARGET_SERVICE} with image tag ${params.IMAGE_TAG} in ephemeral environment"
                    def envVarName = serviceMap[params.TARGET_SERVICE]

                    if (envVarName) {
                        withCredentials([
                            usernamePassword(credentialsId: "ghcr-token", usernameVariable: "GH_USERNAME", passwordVariable: "GH_TOKEN"),
                            string(credentialsId: DB_USERNAME, variable: "DB_USERNAME"),
                            string(credentialsId: DB_PASSWORD, variable: "DB_PASSWORD"),
                        ]) {
                            // Create .env file with database credentials for docker-compose
                            sh "echo DB_USERNAME=${env.DB_USERNAME} > .env"
                            sh "echo DB_PASSWORD=${env.DB_PASSWORD} >> .env"
                            sh "echo DB_HOST=ep-cool-silence-akxxpc18-pooler.c-3.us-west-2.aws.neon.tech >> .env"
                            sh "echo DB_NAME=apex-tracker >> .env"
                            sh "echo KAFKA_BOOTSTRAP_SERVERS=apex-kafka:9092 >> .env"


                            echo "Deploying ${params.TARGET_SERVICE} using variable ${envVarName}"
                            sh "echo \${GH_TOKEN} | docker login \${REGISTRY} -u \${GH_USERNAME} --password-stdin"
                            sh "export ${envVarName}=${env.SERVICE_IMAGE} && docker compose -f docker-compose.yml up -d --wait"
                            sh "sleep 10"
                        }
                    } else {
                        echo "Target service ${params.TARGET_SERVICE} is not recognized. Please check the service name in the serviceMap and try again."
                    }
                }
            }
        }

        stage('Run API Tests') {
            steps{
                dir('api-tests') {
                    echo "Executing API tests against ${params.TARGET_SERVICE} with image tag ${params.IMAGE_TAG}"
                    sh "mvn test -DsuiteXmlfile='suites/testng-${params.TARGET_SERVICE}.xml'"
                }
            }
        }
    }
    post {
        always{
            echo "Cleaning up ephemeral environment for ${params.TARGET_SERVICE} with image tag ${params.IMAGE_TAG}"
            sh "docker compose -f docker-compose.yml down -v --remove-orphans"
            testng(reportFilenamePattern: '**/testng-results.xml')
        }
    }
}