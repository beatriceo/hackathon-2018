#!/bin/sh
# Written by Ted Hart-Davis, 31st October 2021

# Find out whether we have (can find) python 3
if [[ ! -x /usr/bin/python3 ]]; then
	echo "Can't find python3"
	exit 1
fi

# And find out whether we have pip
if [[ ! -x /usr/bin/pip ]]; then
	echo "Can't find pip"
	exit 1
fi

echo "Attempting to get pip to install required items"

pip install -r requirements.txt

