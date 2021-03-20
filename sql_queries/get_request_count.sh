#!/bin/sh

psql -U bc_full_stack -c "SELECT COUNT(*) FROM bc_full_stack_developer_apirequest"
