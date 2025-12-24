pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend - Install') {
            steps {
                dir('os_api') {
                    sh 'npm install'
                }
            }
        }

        stage('Backend - Build') {
            steps {
                dir('os_api') {
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend - Install') {
            steps {
                dir('os_app') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir('os_app') {
                    sh 'npm run build'
                }
            }
        }
    }
}
