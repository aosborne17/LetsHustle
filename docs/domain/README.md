### Pointing your load balancers to your domain name

- On the domain page of where your purchased your domain, add in the custom DNS below if using digital ocean

- These represent the number of nodes that you are running on your k8 cluster, hence I have two

![image](/media/images/custom-nameservers.png)

- Then on the digital ocean control panel, go to networks and domains and input the domain name we purchased

![image](/media/images/add-digitalocean-domain.png)

- Adding this @ record tells digital ocean where to route anything coming from this domain

![image](/media/images/a-record-digitalocean.png)

- Adding the cname record
  ![image](/media/images/cname-digital-ocean.png)

- Now we set our ingress nginx for production to point to our domain name

![image](/media/images/production-ingress-nginx-host.png)
