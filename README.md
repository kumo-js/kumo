# kumo


```

/apps
	/system
		/config
			dev.json
			stage.json	
			…
		/ops
			/cf-template-builders
				sns.js

		cf-settings.json 
		{
			stack-set: {
				name: ‘system’,
				scripts: [
					{
						type: ‘template’,
						template-name: ‘sns’,
						cmd: ‘node ./ops/cf-template-builders/sns.js   -c $ENV_CONFIG_FILE  -s $STACK_INPUTS_FILE  -o $TEMPLATE_FILE’ 
					}	
				]
			}
		}

	/updates
		/lib
		/lambda
		/config
			common.json { lambdas: {updates: {timeout: 300}}}
			dev.json  
			stage.json
			…
		/ops

		cf-settings.json 
		{
			dependsOn: [‘../system’]
			stack-set: {
				name: ‘updates’,
				scripts: [
					{
						type: ‘template’,
						template-name: ‘lambdas’,
						cmd: ‘npm run build-cf-lambda-template  -c $ENV_CONFIG_FILE  -si $STACK_INTPUTS_FILE  -o $TEMPLATE_FILE’ 
					},
					{
						type: ‘command’,
						cmd: ‘npm run configure-lambda-events  -c $ENV_CONFIG_FILE  -si $STACK_INPUTS_FILE -so $STACK_OUTPUTS_FILE’
					}	
				]
			}
		}


		lambda-settings.json 
		{
			s3-upload-bucket: 
			lambdas: {
				webhook-notifier: {
					runtime: ‘nodejs’,
					package-cmd: ‘npm run package-nodejs-lambda ./lambda -o $PACKAGE_FILE’,
					handler: ‘index.handler’,
					role-policy: {},
					memory: {$ref: #/_config/lambdas/updates/memory},
					timeout: {$ref: #/_config/lambdas/updates/timeout},
					events: [
						{
							type: ‘s3’,
							settings: {
								bucket: {$ref: #/_stack/my-bucket},
								bucketEvents: [‘s3:ObjectCreated:*’]
							}
						}
					]		
				}
			},

			_config: {

			},

			_stack: {

			}
		}



config file:
{
	“key1”: “value”
	“key2”: “kms:encryptedValue”
}




1. jaon-config-collector -s /updates/cf-settings.json -o ./somepath/config.json -e stage
2. stack-builder -s /updates/settings.json  -c ./somepath/config.json





Individual tools:

cf-stack-builder
json-config-collector
cf-stack-outputs-collector
nodejs-lambda-packager
lambda-cf-template-builder
lambda-events-configurator




kumo build-stack 
kumo collect-config
kumo collect-stack-outputs
kumo package-nodejs-lambda
kumo build-lambda-template
kumo configure-lambda-events


kumo build-stack -s settings.son

		cmd: kumo build-template …
		cmd: kumo-build-template …
		cmd: my-builder……





New repo - servers ?








kumo
	- exposes kumo cli 
	- reads kumo.json for plugins
	- calls plugin that matches the given action (each plugin with need to provide the list of supported actions)






/ popeye



	/apps
		/updates

			/.kumo
			kumo.json

			stack-settings.json



	cd popeye
	kumo  build-stack  -w /apps/updates build-stack

```
