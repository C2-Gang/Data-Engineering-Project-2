pipeline {
  agent any
  stages {
    stage('Environment') {
      steps {
        sh 'git --version'
        sh 'git remote -v'
        sh 'docker -v'
      }
    }
    stage('Docker Test and Run'){
      steps {
        echo 'Here must build'
        sh ' docker-compose -f docker-compose.yml up -d '
      }
      }
    stage('Deploy on Release branch'){
      steps {
            echo 'Here must deploy'
            sh 'git fetch origin'
            sh 'git checkout develop'
            sh 'git merge ${BRANCH}'
            withCredentials([string(credentialsId: 'secret_token', variable: 'secret_token')]) {
                sh 'git push https://${secret_token}@github.com/C2-Gang/Data-Engineering-Project-2.git'
            }
      }

    }
  }
}