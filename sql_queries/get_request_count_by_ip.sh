#!/bin/sh

psql -U bc_full_stack -c "SELECT COUNT(*) AS request_count, bc.ip_address FROM bc_full_stack_developer_apirequest bc GROUP BY bc.ip_address"
