### Using Digital Ocean on local machine

- First you need to install doctl

- Then run doctl auth command to get access

```



We can run a command from our terminal to add our secret key to ouir digital ocean k8 cluster

- switch to digital ocean context

```

kubectl config use-context <name-of-context>

```

- You can check to see all the contexts on your local machine by

```

kubectl config view

```

- now manualy create a secret on digital ocean

```

kubectl create secret generic <RANDOM_KEY_NAME> --from-literal=<RANDOM_KEY>=<RANDOM_KEY_VALUE>

```

```

### Setting up ingress nginx on digital ocean

- Running the below command will set up ingress nginx on our digital ocean cluster

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/do/deploy.yaml
```
