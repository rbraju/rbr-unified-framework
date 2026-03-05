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
                sh "docker compose -f docker-compose.test.yml down -v --remove-orphans || true"
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
                        withCredentials([usernamePassword(credentialsId: "github-rbrcloud-credentials", usernameVariable: "GH_USERNAME", passwordVariable: "GH_TOKEN")]) {
                            echo "Deploying ${params.TARGET_SERVICE} using variable ${envVarName}"
                            sh "echo \${GH_TOKEN} | docker login \${REGISTRY} -u \${GH_USERNAME} --password-stdin"
                            sh "export ${envVarName}=${env.SERVICE_IMAGE} && docker compose -f docker-compose.test.yml up -d --wait"
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
            sh "docker compose -f docker-compose.test.yml down -v --remove-orphans"
            testng(reportFilenamePattern: '**/testng-results.xml')
        }
    }
}