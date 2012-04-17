test:
	./node_modules/.bin/mocha \
	--reporter list \
	--globals last_arg_type,n,i,cb

.PHONY: test
