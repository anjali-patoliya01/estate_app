// Copyright (c) 2024, sigzen and contributors
// For license information, please see license.txt

frappe.query_reports["Property Script Report"] = {
	"filters": [
		{
			"fieldname": "property_name",
			"label": __("Property Name"),
			"fieldtype": "Data",
			"options": "Name",
			"width" : 100,
			'reqd': 0,
		},

		{
			"fieldname": "agent",
			"label": __("Agent"),
			"fieldtype": "Link",
			"options": "Agent",
			"width" : 100,
			'reqd': 0,
		},

		{
			"fieldname": "status",
			"label": __("Status"),
			"fieldtype": "Select",
			"default": "",
			"options": ['','Sale','Rent','Lease'],
			"width" : 100,
			'reqd': 0,
		},

	]
};
