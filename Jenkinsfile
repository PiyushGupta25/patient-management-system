pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Fetching source from GitHub'
                checkout scm
            }
        }

        stage('Verify') {
            steps {
                echo 'Checking required files'
                bat 'if not exist index.html exit 1'
                bat 'if not exist app.js exit 1'
                bat 'if not exist style.css exit 1'
                bat 'if not exist Dockerfile exit 1'
                bat 'if not exist Jenkinsfile exit 1'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image'
                bat 'docker build -t patient-management .'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS - Build completed'
        }

        failure {
            echo 'FAILURE - Check console output'
        }
    }
}
