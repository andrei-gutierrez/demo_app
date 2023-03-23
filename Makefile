.PHONY: k3d_create, argocd_install, argocd_getpwd, argocd_getstate, argocd_addrepo_elastic, argocd_addapp_elastic, argocd_addapp_kibana, argocd_addapp_apmserver 

k3d_create:
	k3d cluster create --config ./cluster-config.yaml \

argocd_install: 
	kubectl create namespace argocd && \
		kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

argocd_getpwd:
	kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo

argocd_getstate:
	kubectl -n argocd get statefulset

argocd_addrepo_elastic:
	argocd repo add https://helm.elastic.co --name elastic --type helm

argocd_addapp_elastic:
	argocd app create elasticsearch -f elastic/argocd-es-app.yml

argocd_appadd_kibana:
	argocd app create kibana -f elastic/argocd-kb-app.yml

argocd_appadd_apmserver:
	argocd app create apmserver -f elastic/argocd-as-app.yml

argocd_addrep_demoapp:
	argocd repo add https://github.com/andrei-gutierrez/demo_app --username andrei-gutierrez --password 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 --type git

argocd_addapp_demoapp:
	argocd app create demoapp -f smallapp/argocd-demo-app.yml


