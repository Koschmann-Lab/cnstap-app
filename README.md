# CNS-TAP Documentation

This is the documentation for the different components of the CNS-TAP except for the knowledge objects. Documentation for those can be see here: [Knowledge Objects](https://github.com/Koschmann-Lab/cnstap-objects). The CNS-TAP app can be accessed at the following URL: [www.cnstap.org](https://www.cnstap.org)

# Introduction to CNS-TAP

The Central Nervous System Targeted Agent Prediction (CNS TAP) tool is a formalized decision-making algorithm to assist clinicians with selecting the optimal targeted therapy for neuro-oncology patients based on drug properties, clinical and pre-clinical data, and patient-specific sequencing data. The main article describing the underlying methodologies and evaluated criteria can be found here: [Development of the CNS TAP tool for the selection of precision medicine therapies in neuro-oncology. J Neurooncol. 2018;137(1):155-169](https://pubmed.ncbi.nlm.nih.gov/29235051/).

# Technical Overview of CNS-TAP

CNS-TAP has several interworking components, illustrated below:

![alt text](https://github.com/Koschmann-Lab/cnstap-app/blob/master/images/Parts%20and%20landscape.png)

## OKTA FOR USER AUTHENTICATION AND EMAIL VERIFICATION

Okta is the application used for user registration and authentication. You can visit the dashboard by going to [www.developer.okta.com/login/](https://developer.okta.com/login/). Here, you can manage new users registered in the app and monitory overall user engagement. The Okta dashboard is shown below:

![alt text](https://github.com/Koschmann-Lab/cnstap-app/blob/master/images/Okta%20dashboard.png)

## HEROKU FOR WEB APP DEPLOYMENT

Heroku is the platform used to host and deploy the code for the CNS-TAP web application. There are two heroku apps, depicted below, CNSTAP-UI and CNSTAPACTIVATOR. CNSTAP-UI is the app that deploys the code for the front end of the app; it is linked directly to the github repository cnstap-app. CNSTAPACTIVATOR is the app that deploys the knowledge objects for the app; It takes the code from the github release section of the cnstap-objects github repository. In Heroku, you can monitor the status of the app and ensure it is up and running.

![alt text](https://github.com/Koschmann-Lab/cnstap-app/blob/master/images/Heroku%20dashboard.png)

## GOOGLE DOMAINS FOR THE DOMAIN NAME

Google Domains is what we used to purchase the domain name cnstap.org. This is what allows the end user to view the app at cnstap.org. Depicted below are details of our domain and life span:

![alt text](https://github.com/Koschmann-Lab/cnstap-app/blob/master/images/Google%20Domains%20dashboard.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
