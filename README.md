# CNS-TAP Documentation

This is the documentation for the different components of the CNS-TAP app except for the knowledge objects that provide drug agent content for the app. Documentation for the Knowledge Objects can be viewed here: [Knowledge Objects](https://github.com/Koschmann-Lab/cnstap-objects). To access and run the CNS-TAP app, go to the following URL: [www.cnstap.org](https://www.cnstap.org)

# Introduction to the CNS-TAP app

The Central Nervous System Targeted Agent Prediction (CNS TAP) tool (or app) provides a formalized decision-making algorithm to assist clinicians with selecting the optimal targeted therapy for neuro-oncology patients based on drug properties, clinical and pre-clinical data, and patient-specific tumor sequencing data. The main article describing the underlying methodologies and evaluated criteria can be found here: [Development of the CNS TAP tool for the selection of precision medicine therapies in neuro-oncology. J Neurooncol. 2018;137(1):155-169](https://pubmed.ncbi.nlm.nih.gov/29235051/).

# Technical Overview of CNS-TAP

CNS-TAP has several interworking components, illustrated below:

![alt text](https://github.com/Koschmann-Lab/cnstap-app/blob/master/images/Parts%20and%20landscape.png)

## OKTA FOR USER AUTHENTICATION AND EMAIL VERIFICATION

The CNS-TAP app uses the Okta platform. Okta is an online platform used for user registration and authentication. Okta allows team members who manage access to CNS-TAP to see and work with user lists.  If you are assisting to help manage CNS-TAP, then, with appropriate credentials, you can visit the Okta dashboard by going to [www.developer.okta.com/login/](https://developer.okta.com/login/). Here, you can manage new users registered in the app and monitor overall user engagement. The Okta dashboard is at the link below:

![alt text](https://github.com/Koschmann-Lab/cnstap-app/blob/master/images/Okta%20dashboard.png)

## HEROKU FOR WEB APP DEPLOYMENT

Heroku is the platform where the CNS-TAP app is hosted on a cloud server, and where the actual code for the CNS-TAP web application is deployed and runs. Inside Heroku, there are actually two heroku apps running as CNS-TAP components. These two apps are depicted below as CNSTAP-UI and CNSTAPACTIVATOR. CNSTAP-UI is the app that deploys the code for the front end of the app that users see and interact with; it is linked directly to the github repository where the cnstap-app code is kept. Meanwhile, CNSTAPACTIVATOR is a second small app that deploys the knowledge objects for the app online. The CNSTAPACTIVATOR takes the code from the github release section of the cnstap-objects github repository. In Heroku, you can monitor the status of these two apps and ensure they are up and running.

![alt text](https://github.com/Koschmann-Lab/cnstap-app/blob/master/images/Heroku%20dashboard.png)

## GOOGLE DOMAINS FOR THE DOMAIN NAME

Google Domains is what we used to purchase the domain name cnstap.org. Having this domain name allows the end user to view the app at cnstap.org. Depicted below are details of our domain and its life span:

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
