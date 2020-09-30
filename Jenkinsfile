pipeline {
    agent {
        label 'linux&&nodejs'
    }

    environment {
        // Used for tests, to make Jest running all tests without watcher
        PORTSCANNER_UI_URL="https://portscanner.guengel.ch"
    }

    triggers {
        pollSCM ''
        upstream(upstreamProjects: 'webtools/lastseenservice/master,webtools/nmapservice/master,webtools/nmapserviceproxy/master,webtools/portscannerui/master', threshold: hudson.model.Result.SUCCESS)
    }

    options {
        ansiColor('xterm')
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '5')
    }

    stages {
        stage('install') {
            steps {
                sh 'npm install'
            }
        }

        stage('test') {
            steps {
                wrap([$class: 'Xvfb', name:'Linux Xvfb']) {
                    sh 'npm start'
                }
            }
        }
    }


    post {
        unsuccessful {
            mail to: "rafi@guengel.ch",
                    subject: "${JOB_NAME} (${BRANCH_NAME};${env.BUILD_DISPLAY_NAME}) -- ${currentBuild.currentResult}",
                    body: "Refer to ${currentBuild.absoluteUrl}"
        }
    }
}
