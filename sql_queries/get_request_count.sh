#!/bin/sh

psql -U bc_full_stack -c "SELECT COUNT(*) AS request_count FROM bc_full_stack_developer_apirequest"
