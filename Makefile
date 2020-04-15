AWS_PROFILE = ivan
S3_BUCKET_NAME 	= etiqa.cnd.com
INDEX_HTML = index.html
ERROR_HTML = 404
CLOUDFRONT_ID = 111

build:
	@npm install --silent
	@npm run build

deploy:
	@echo $(S3_BUCKET_NAME)
	@aws s3 sync dist/SavorOfLifeBack s3://$(S3_BUCKET_NAME) --acl public-read --delete --profile $(AWS_PROFILE)
	@aws configure set preview.cloudfront true
	# @aws cloudfront create-invalidation --profile $(AWS_PROFILE) --distribution-id $(CLOUDFRONT_ID) --paths "/*"

setup:
	@aws s3api put-bucket-policy --bucket $(S3_BUCKET_NAME) --policy file://policy.json
	@aws s3 website s3://$(S3_BUCKET_NAME) --index-document $(INDEX_HTML) --error-document $(ERROR_HTML) --profile $(AWS_PROFILE)%
